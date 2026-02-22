"""Personalization Engine — adapts explanation complexity and tone."""
from typing import Dict, List

PERSONALIZATION_TEMPLATES = {
    "simple": {
        "prefix": "Here's what your test results mean in simple terms:\n\n",
        "normal_phrase": "is in the healthy range — that's good news! ✓",
        "high_phrase": "is a bit higher than usual. Your doctor can help you understand what this means.",
        "low_phrase": "is a bit lower than usual. Your doctor can suggest ways to improve this.",
        "critical_phrase": "needs attention. It's important to discuss this with your doctor soon.",
        "closing": "\n\nRemember: These are just numbers, and your doctor knows your full health picture. Don't worry — many of these can be improved with simple lifestyle changes.",
        "tone": "warm"
    },
    "standard": {
        "prefix": "## Your Lab Results Interpretation\n\n",
        "normal_phrase": "is within the normal reference range.",
        "high_phrase": "is above the reference range, which may indicate an area to monitor.",
        "low_phrase": "is below the reference range, which may warrant further evaluation.",
        "critical_phrase": "is significantly outside the normal range and should be discussed with your healthcare provider.",
        "closing": "\n\nPlease consult your healthcare provider for a comprehensive evaluation and personalized recommendations.",
        "tone": "professional"
    },
    "detailed": {
        "prefix": "## Detailed Laboratory Analysis\n\n",
        "normal_phrase": "falls within established reference intervals, suggesting normal physiological function.",
        "high_phrase": "exceeds the upper reference limit. Potential clinical implications are discussed below with supporting evidence.",
        "low_phrase": "is below the lower reference limit. This finding may be clinically significant as outlined in the evidence below.",
        "critical_phrase": "is markedly abnormal and requires prompt clinical correlation. The deviation from reference values is substantial.",
        "closing": "\n\nThis analysis is based on established medical literature and clinical guidelines. Interpretation should be contextualized within the patient's clinical presentation and history.",
        "tone": "clinical"
    }
}

def personalize_explanation(explanation_result: Dict, level: str = "standard") -> Dict:
    """Apply personalization to the explanation based on complexity level."""
    template = PERSONALIZATION_TEMPLATES.get(level, PERSONALIZATION_TEMPLATES["standard"])
    
    explanation_result["personalization_applied"] = {
        "level": level,
        "tone": template["tone"]
    }
    
    # Adjust section content based on level
    sections = explanation_result.get("sections", [])
    for section in sections:
        if level == "simple":
            # Simplify language
            content = section.get("content", "")
            content = _simplify_text(content)
            section["content"] = content
    
    # Add personalized prefix/closing to summary
    summary = explanation_result.get("explanation_text", "")
    explanation_result["explanation_text"] = template["prefix"] + summary + template["closing"]
    
    return explanation_result

def _simplify_text(text: str) -> str:
    """Replace medical jargon with simpler terms."""
    replacements = {
        "hyperuricemia": "high uric acid levels",
        "hyperlipidemia": "high cholesterol",
        "dyslipidemia": "imbalanced cholesterol levels",
        "hypothyroidism": "underactive thyroid",
        "hyperthyroidism": "overactive thyroid",
        "leukocytosis": "high white blood cell count",
        "anemia": "low red blood cell or hemoglobin levels",
        "hepatocellular": "liver cell",
        "atherosclerosis": "plaque buildup in arteries",
        "pathophysiology": "how the condition develops",
        "microvascular": "small blood vessel",
        "megaloblastic": "a type of",
        "subclinical": "mild or early-stage",
        "pharmacological": "medication-based",
        "etiology": "cause",
        "prognosis": "outlook",
        "comorbidity": "related condition",
    }
    for term, simple in replacements.items():
        text = text.replace(term, simple)
        text = text.replace(term.capitalize(), simple.capitalize())
    return text

def get_anxiety_level(findings: List[Dict]) -> str:
    """Assess patient anxiety risk based on findings."""
    critical_count = sum(1 for f in findings if f.get("status") == "critical")
    abnormal_count = sum(1 for f in findings if f.get("status") in ("high", "low"))
    
    if critical_count >= 2:
        return "high"
    elif critical_count >= 1 or abnormal_count >= 5:
        return "moderate"
    else:
        return "low"
