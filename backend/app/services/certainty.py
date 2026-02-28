"""Certainty Tagging Service — distinguishes established facts from AI inferences."""
from typing import Dict, List, Optional


def tag_certainty(explanation_result: Dict, confidence_scores: Optional[Dict] = None) -> Dict:
    """
    Post-process explanation sections to tag each with a certainty level.
    
    - 'established': Backed by direct lab values + strong evidence (high confidence)
    - 'inferred': Derived by LLM reasoning without strong direct evidence
    
    This function only ADDS a 'certainty_level' key to each section.
    It does not modify any existing data.
    """
    sections = explanation_result.get("sections", [])
    per_finding = confidence_scores.get("per_finding", {}) if confidence_scores else {}
    overall_confidence = confidence_scores.get("overall", 0.5) if confidence_scores else 0.5
    retrieval_confidence = 0.5
    if confidence_scores and confidence_scores.get("stages"):
        retrieval_confidence = confidence_scores["stages"].get("retrieval", 0.5)

    for section in sections:
        certainty = _classify_section(section, per_finding, overall_confidence, retrieval_confidence)
        section["certainty_level"] = certainty

    explanation_result["sections"] = sections
    return explanation_result


def _classify_section(
    section: Dict,
    per_finding: Dict,
    overall_confidence: float,
    retrieval_confidence: float
) -> str:
    """
    Classify a section as 'established' or 'inferred' based on multiple signals.
    """
    severity = section.get("severity", "normal")
    findings_covered = section.get("findings_covered", [])
    content = section.get("content", "")

    # Signal 1: Severity — normal findings are typically established
    severity_score = 1.0 if severity == "normal" else 0.5

    # Signal 2: Finding confidence — average confidence of covered findings
    finding_scores = []
    for name in findings_covered:
        if name in per_finding:
            finding_scores.append(per_finding[name])
    avg_finding_confidence = sum(finding_scores) / len(finding_scores) if finding_scores else 0.5

    # Signal 3: Has citation references
    import re
    has_citations = bool(re.findall(r'\[\d+\]', content))
    citation_score = 0.8 if has_citations else 0.3

    # Signal 4: Uses hedging language (indicates inference)
    hedging_words = ["may", "could", "might", "suggest", "possibly", "potentially", "likely"]
    hedge_count = sum(1 for w in hedging_words if w in content.lower())
    hedge_score = max(0.2, 1.0 - (hedge_count * 0.15))

    # Signal 5: Retrieval confidence
    retrieval_score = retrieval_confidence

    # Weighted composite
    composite = (
        severity_score * 0.15 +
        avg_finding_confidence * 0.25 +
        citation_score * 0.25 +
        hedge_score * 0.15 +
        retrieval_score * 0.20
    )

    return "established" if composite >= 0.60 else "inferred"
