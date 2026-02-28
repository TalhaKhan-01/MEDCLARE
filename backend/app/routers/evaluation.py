"""Evaluation Router — doctor-only evaluation endpoints."""
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Report, EvaluationResult, StructuredFinding
from app.schemas import EvaluationOut, EvaluationRunRequest
from app.auth import get_current_user, require_role

router = APIRouter(prefix="/evaluation", tags=["Evaluation"])


@router.post("/run/{report_id}", response_model=EvaluationOut)
def run_evaluation(
    report_id: str,
    body: EvaluationRunRequest = EvaluationRunRequest(),
    user: User = Depends(require_role("doctor")),
    db: Session = Depends(get_db)
):
    """Run a quality evaluation on an existing report's AI output."""
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if report.status not in ("explained", "verified", "edited"):
        raise HTTPException(status_code=400, detail="Report must be processed before evaluation")

    # Get findings for this report
    findings = db.query(StructuredFinding).filter(StructuredFinding.report_id == report.id).all()
    findings_data = [
        {
            "test_name": f.test_name,
            "value": f.value,
            "unit": f.unit or "",
            "status": f.status or "unknown",
            "category": f.category or "General",
            "confidence": f.confidence or 0.5
        }
        for f in findings
    ]

    from app.services.evaluation import evaluate_report
    result = evaluate_report(
        explanation_text=report.explanation_text or "",
        explanation_sections=report.explanation_sections or [],
        citations=report.citations or [],
        findings=findings_data,
        guardrail_flags=report.guardrail_flags or [],
        confidence_scores=report.confidence_scores,
        gold_standard=body.gold_standard
    )

    eval_record = EvaluationResult(
        report_id=report.id,
        completeness_score=result["completeness_score"],
        safety_score=result["safety_score"],
        citation_density=result["citation_density"],
        hallucination_risk=result["hallucination_risk"],
        overall_score=result["overall_score"],
        grade=result["grade"],
        details=result["details"],
        gold_standard=body.gold_standard,
        evaluated_by=user.id
    )
    db.add(eval_record)
    db.commit()
    db.refresh(eval_record)
    return EvaluationOut.model_validate(eval_record)


@router.get("/benchmark", response_model=list[EvaluationOut])
def get_benchmark(
    user: User = Depends(require_role("doctor")),
    db: Session = Depends(get_db)
):
    """Get all evaluation results as a benchmark summary."""
    results = (
        db.query(EvaluationResult)
        .order_by(EvaluationResult.created_at.desc())
        .limit(50)
        .all()
    )
    return [EvaluationOut.model_validate(r) for r in results]


@router.get("/{report_id}", response_model=list[EvaluationOut])
def get_report_evaluations(
    report_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get evaluations for a specific report."""
    results = (
        db.query(EvaluationResult)
        .filter(EvaluationResult.report_id == report_id)
        .order_by(EvaluationResult.created_at.desc())
        .all()
    )
    return [EvaluationOut.model_validate(r) for r in results]
