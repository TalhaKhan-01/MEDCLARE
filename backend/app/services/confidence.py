"""Confidence Aggregation Pipeline — multi-signal confidence scoring."""
from typing import Dict, List, Optional

def aggregate_confidence(
    ocr_confidence: float,
    extraction_findings: List[Dict],
    retrieval_evidence: List[Dict],
    guardrail_result: Optional[Dict] = None
) -> Dict:
    """
    Aggregate confidence from all pipeline stages into a composite score.
    Returns per-finding and overall confidence.
    """
    # Stage weights
    WEIGHTS = {
        "ocr": 0.20,
        "extraction": 0.25,
        "retrieval": 0.30,
        "guardrail": 0.25
    }
    
    # OCR confidence (0-1)
    ocr_score = min(max(ocr_confidence, 0), 1)
    
    # Extraction confidence — average of individual finding confidences
    extraction_scores = [(f.get("confidence") or 0.5) for f in extraction_findings]
    extraction_score = sum(extraction_scores) / len(extraction_scores) if extraction_scores else 0.5
    
    # Retrieval confidence — average relevance scores
    retrieval_scores = [(e.get("relevance_score") or 0.5) for e in retrieval_evidence]
    retrieval_score = sum(retrieval_scores) / len(retrieval_scores) if retrieval_scores else 0.5
    
    # Guardrail confidence — based on number and severity of flags
    guardrail_score = 1.0
    if guardrail_result:
        flags = guardrail_result.get("guardrail_flags", [])
        warning_count = sum(1 for f in flags if f.get("severity") == "warning")
        info_count = sum(1 for f in flags if f.get("severity") == "info")
        guardrail_score = max(0.3, 1.0 - (warning_count * 0.15) - (info_count * 0.05))
    
    # Weighted aggregate
    overall = (
        WEIGHTS["ocr"] * ocr_score +
        WEIGHTS["extraction"] * extraction_score +
        WEIGHTS["retrieval"] * retrieval_score +
        WEIGHTS["guardrail"] * guardrail_score
    )
    
    # Per-finding confidence
    finding_confidences = {}
    for f in extraction_findings:
        name = f.get("test_name", "Unknown")
        f_base = f.get("confidence") or 0.5
        # Find matching evidence
        matching_evidence = [e for e in retrieval_evidence 
                          if name.lower() in e.get("content", "").lower()]
        f_retrieval = max([(e.get("relevance_score") or 0.5) for e in matching_evidence]) if matching_evidence else 0.4
        finding_confidences[name] = round(
            0.3 * ocr_score + 0.3 * f_base + 0.4 * f_retrieval, 3
        )
    
    return {
        "overall": round(overall, 3),
        "stages": {
            "ocr": round(ocr_score, 3),
            "extraction": round(extraction_score, 3),
            "retrieval": round(retrieval_score, 3),
            "guardrail": round(guardrail_score, 3)
        },
        "per_finding": finding_confidences,
        "quality_label": _quality_label(overall)
    }

def _quality_label(score: float) -> str:
    if score >= 0.85:
        return "high"
    elif score >= 0.65:
        return "moderate"
    elif score >= 0.45:
        return "low"
    else:
        return "very_low"
