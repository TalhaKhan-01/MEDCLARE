"""AI Orchestration Layer — coordinates the deterministic pipeline."""
import json
from datetime import datetime
from sqlalchemy.orm import Session
from app.models import Report, StructuredFinding, ExplanationVersion, AuditLog
from app.services.ocr import perform_ocr
from app.services.extraction import extract_findings
from app.services.rag import retrieve_evidence
from app.services.explanation import generate_explanation
from app.services.guardrails import check_guardrails
from app.services.personalization import personalize_explanation
from app.services.confidence import aggregate_confidence

async def run_pipeline(report_id: str, personalization_level: str, db: Session, lang: str = "en") -> Report:
    """
    Execute the full deterministic interpretation pipeline:
    1. OCR → 2. Extraction → 3. Retrieval → 4. Explanation → 5. Guardrails → 6. Personalization → 7. Confidence
    """
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise ValueError(f"Report {report_id} not found")
    
    reasoning_trace = {"pipeline_start": datetime.utcnow().isoformat(), "stages": []}
    
    try:
        # ── Stage 1: OCR ──
        report.status = "processing"
        db.commit()
        
        ocr_text, ocr_confidence = await perform_ocr(report.file_path)
        report.ocr_text = ocr_text
        report.ocr_confidence = ocr_confidence
        reasoning_trace["stages"].append({
            "stage": "ocr", "confidence": ocr_confidence,
            "text_length": len(ocr_text), "timestamp": datetime.utcnow().isoformat()
        })
        
        # ── Stage 2: Extraction ──
        from app.services.extraction import classify_document_type, extract_lab_report_ai, extract_prescription_ai
        
        report.report_type = await classify_document_type(ocr_text)
        db.commit()
        
        findings_data = []
        med_data = []
        
        if report.report_type == "prescription":
            med_data = await extract_prescription_ai(ocr_text)
            report.extraction_json = med_data
            
            from app.models import Medication
            db.query(Medication).filter(Medication.report_id == report.id).delete()
            for m in med_data:
                med = Medication(
                    report_id=report.id,
                    name=m["name"],
                    dosage=m.get("dosage"),
                    frequency=m.get("frequency"),
                    duration=m.get("duration"),
                    instructions=m.get("instructions")
                )
                db.add(med)
        else:
            findings_data = await extract_lab_report_ai(ocr_text)
            report.extraction_json = findings_data
            
            db.query(StructuredFinding).filter(StructuredFinding.report_id == report.id).delete()
            for f in findings_data:
                # Skip findings with no test_name (NOT NULL constraint)
                if not f.get("test_name"):
                    continue
                finding = StructuredFinding(
                    report_id=report.id,
                    test_name=f["test_name"],
                    value=f.get("value") or "",
                    unit=f.get("unit", ""),
                    reference_range=f.get("reference_range", ""),
                    status=f.get("status") or "unknown",
                    category=f.get("category", "General"),
                    confidence=f.get("confidence", 0.5)
                )
                db.add(finding)
        
        report.status = "extracted"
        db.commit()
        
        reasoning_trace["stages"].append({
            "stage": "extraction", "type": report.report_type,
            "items_count": len(report.extraction_json),
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # ── Stage 3: RAG Retrieval ──
        abnormal_findings = [f for f in findings_data if (f.get("status") or "unknown") in ("high", "low", "critical")]
        evidence = retrieve_evidence(abnormal_findings)
        report.citations = evidence
        
        reasoning_trace["stages"].append({
            "stage": "retrieval", "evidence_count": len(evidence),
            "avg_relevance": round(sum((e.get("relevance_score") or 0) for e in evidence) / len(evidence), 3) if evidence else 0,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # ── Stage 4: Explanation Generation ──
        current_meds = med_data if report.report_type == "prescription" else []
        explanation_result = await generate_explanation(
            findings_data, evidence, report.ocr_text, personalization_level,
            medications=current_meds, lang=lang
        )
        
        reasoning_trace["stages"].append({
            "stage": "explanation", "model": explanation_result.get("model_used", "unknown"),
            "sections_count": len(explanation_result.get("sections", [])),
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # ── Stage 5: Guardrails ──
        guardrail_result = check_guardrails(explanation_result)
        report.guardrail_flags = guardrail_result.get("guardrail_flags", [])
        
        reasoning_trace["stages"].append({
            "stage": "guardrail", "passed": guardrail_result.get("guardrail_passed", False),
            "flags_count": len(guardrail_result.get("guardrail_flags", [])),
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # ── Stage 6: Personalization ──
        personalized = personalize_explanation(guardrail_result, personalization_level)
        report.personalization_level = personalization_level
        
        reasoning_trace["stages"].append({
            "stage": "personalization", "level": personalization_level,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # ── Stage 7: Confidence Aggregation ──
        confidence = aggregate_confidence(ocr_confidence, findings_data, evidence, guardrail_result)
        report.confidence_scores = confidence
        report.overall_confidence = confidence["overall"]
        
        # ── Save Results ──
        report.explanation_text = personalized.get("explanation_text", "")
        report.explanation_sections = personalized.get("sections", [])
        report.citations = personalized.get("citations", [])
        report.lang = lang
        report.status = "explained"
        report.reasoning_trace = reasoning_trace
        report.updated_at = datetime.utcnow()
        
        # Save original version
        version = ExplanationVersion(
            report_id=report.id,
            version=1,
            explanation_text=report.explanation_text,
            explanation_sections=report.explanation_sections,
            edit_type="original"
        )
        db.add(version)
        
        # Audit log
        audit = AuditLog(
            report_id=report.id,
            action="pipeline_complete",
            details={"confidence": confidence["overall"], "findings": len(findings_data)}
        )
        db.add(audit)
        
        db.commit()
        db.refresh(report)
        return report
    
    except Exception as e:
        db.rollback()
        try:
            report = db.query(Report).filter(Report.id == report_id).first()
            if report:
                report.status = "error"
                reasoning_trace["error"] = str(e)
                report.reasoning_trace = reasoning_trace
                audit = AuditLog(report_id=report.id, action="pipeline_error", details={"error": str(e)})
                db.add(audit)
                db.commit()
        except Exception:
            db.rollback()
        raise e
