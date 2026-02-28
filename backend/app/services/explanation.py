"""Explanation Generation Service — grounded narrative via OpenRouter LLM."""
import json
import httpx
from typing import List, Dict, Optional
from app.config import settings

async def generate_explanation(
    findings: List[Dict],
    evidence: List[Dict],
    ocr_text: Optional[str] = None,
    personalization_level: str = "standard",
    medications: List[Dict] = [],
    lang: str = "en"
) -> Dict:
    """Generate a structured, grounded explanation from findings, medications, and evidence."""
    
    findings_text = _format_findings(findings)
    medications_text = _format_medications(medications)
    evidence_text = _format_evidence(evidence)
    
    lang_map = {
        "hi": "Hindi", "te": "Telugu", "ta": "Tamil", "or": "Odia",
        "ml": "Malayalam", "bn": "Bengali", "pa": "Punjabi", "mr": "Marathi", "en": "English"
    }
    target_lang = lang_map.get(lang, "English")
    
    system_prompt = _build_system_prompt(personalization_level, target_lang)
    user_prompt = _build_user_prompt(findings_text, medications_text, evidence_text, ocr_text, personalization_level, target_lang)
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{settings.OPENROUTER_BASE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://medclare.app",
                    "X-Title": "MEDCLARE Medical Interpretation"
                },
                json={
                    "model": settings.OPENROUTER_MODEL,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "temperature": 0.3,
                    "max_tokens": 3000,
                    "response_format": {"type": "json_object"}
                }
            )
            response.raise_for_status()
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            
            try:
                result = json.loads(content)
            except json.JSONDecodeError:
                result = {"summary": content, "sections": [], "citations": []}
            
            return {
                "explanation_text": result.get("summary", ""),
                "sections": result.get("sections", []),
                "citations": result.get("citations", []),
                "confidence": 0.85,
                "model_used": settings.OPENROUTER_MODEL
            }
    
    except Exception as e:
        print(f"LLM call failed: {e}")
        return _generate_fallback_explanation(findings, evidence)

def _format_findings(findings: List[Dict]) -> str:
    lines = []
    for f in findings:
        status = f.get('status') or 'unknown'
        status_icon = "⚠️" if status in ("high", "low", "critical") else "✓"
        lines.append(f"{status_icon} {f['test_name']}: {f['value']} {f.get('unit', '')} "
                     f"(Ref: {f.get('reference_range', 'N/A')}) — Status: {status.upper()}")
    return "\n".join(lines)

def _format_medications(medications: List[Dict]) -> str:
    lines = []
    for m in medications:
        lines.append(f"- {m['name']} ({m.get('dosage', 'N/A')}): {m.get('frequency', 'N/A')} for {m.get('duration', 'N/A')}. Instructions: {m.get('instructions', 'None')}")
    return "\n".join(lines)

def _format_evidence(evidence: List[Dict]) -> str:
    lines = []
    for i, e in enumerate(evidence, 1):
        lines.append(f"[{i}] ({e.get('source', 'Reference')}) {e['content']}")
    return "\n\n".join(lines)

def _build_system_prompt(level: str, target_lang: str) -> str:
    return f"""You are MEDCLARE, a medical document interpretation system. You DO NOT diagnose. 
You explain medical lab results AND other medical documents (like prescriptions or advisory notes) based on structured findings and raw document text.

CRITICAL RULES:
1. GENERATE ALL OUTPUT (summary, section titles, section content, recommended actions, and disclaimer) IN {target_lang.upper()}.
2. NEVER make a diagnosis. Use phrases like "may suggest", "is commonly associated with", "per original document".
3. EVERY claim must reference a citation number [N] if from medical evidence, or explicitly mention it's from the original document.
4. If blood test findings are available, prioritize explaining them. 
5. If no blood test findings but raw text is present, interpret the raw text (e.g., explain medications, dosages, or hospital instructions).
6. Clearly distinguish between normal results, abnormal results, and general medical instructions.
7. Express uncertainty when text is unclear or evidence is limited.
8. Always include "Recommended Actions" (e.g., "Follow the prescribed course", "Consult your doctor").
9. For each section, provide a "source_mapping" array that traces each key claim back to its source.

OUTPUT FORMAT (JSON):
{{
  "summary": "Brief overall summary paragraph in {target_lang}",
  "sections": [
    {{
      "title": "Category Name in {target_lang} (e.g. Medications, Hematology, Instructions)",
      "content": "Detailed explanation in {target_lang} with [N] citations where applicable",
      "findings_covered": ["Test1", "MedicationA"],
      "severity": "normal|attention|concern",
      "source_mapping": [
        {{"sentence": "Key claim sentence", "source_type": "finding|evidence|document", "source_ref": "Test name or citation ID or 'original document'"}}
      ]
    }}
  ],
  "citations": [
    {{"id": 1, "source": "Source Name", "text": "Key quote"}}
  ],
  "recommended_actions": ["Action 1 in {target_lang}", "Action 2 in {target_lang}"],
  "disclaimer": "Standard medical disclaimer text in {target_lang}"
}}"""

def _build_user_prompt(findings: str, medications: str, evidence: str, ocr_text: Optional[str], level: str, target_lang: str) -> str:
    complexity_guide = {
        "simple": f"Use very simple language in {target_lang} at a 6th-grade reading level. Avoid medical jargon. Be reassuring.",
        "standard": f"Use clear, accessible language in {target_lang}. Briefly explain medical terms when used.",
        "detailed": f"Provide thorough clinical detail in {target_lang}. Include pathophysiology context where relevant."
    }
    
    prompt = f"""## Raw Document Text
{ocr_text if ocr_text else "Not available"}

## Structured Findings (Primary Lab Data)
{findings if findings else "No structured lab data extracted"}

## Medications & Dosages
{medications if medications else "No structured medication data extracted"}

## Retrieved Medical Evidence
{evidence if evidence else "No direct medical evidence found"}

## Personalization & Language
Target Language: {target_lang}
{complexity_guide.get(level, complexity_guide['standard'])}

Generate a structured, grounded explanation for this medical document in {target_lang}. 
If it is a prescription/advisory note, summarize the medications and instructions accurately.
If it is a lab report, focus on values and their significance.
Be factual and clinical, never alarmist. Ensure ALL fields in the JSON response are in {target_lang}."""
    return prompt

def _generate_fallback_explanation(findings: List[Dict], evidence: List[Dict]) -> Dict:
    """Generate explanation without LLM when API is unavailable."""
    abnormal = [f for f in findings if (f.get("status") or "unknown") in ("high", "low", "critical")]
    normal = [f for f in findings if (f.get("status") or "unknown") == "normal"]
    
    sections = []
    
    # Group by category
    categories = {}
    for f in findings:
        cat = f.get("category", "General")
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(f)
    
    for cat, cat_findings in categories.items():
        abnormal_in_cat = [f for f in cat_findings if (f.get("status") or "unknown") != "normal"]
        if abnormal_in_cat:
            content_parts = []
            for f in abnormal_in_cat:
                direction = "above" if (f.get("status") or "unknown") in ("high", "critical") else "below"
                content_parts.append(
                    f"Your {f['test_name']} level is {f['value']} {f.get('unit', '')}, "
                    f"which is {direction} the reference range ({f.get('reference_range', 'N/A')}). "
                    f"This finding may warrant further evaluation by your healthcare provider."
                )
            sections.append({
                "title": cat,
                "content": " ".join(content_parts),
                "findings_covered": [f["test_name"] for f in abnormal_in_cat],
                "severity": "concern" if any((f.get("status") or "unknown") == "critical" for f in abnormal_in_cat) else "attention"
            })
        else:
            sections.append({
                "title": cat,
                "content": f"All {cat.lower()} markers are within normal reference ranges.",
                "findings_covered": [f["test_name"] for f in cat_findings],
                "severity": "normal"
            })
    
    return {
        "explanation_text": "This automated clinical interpretation summarizes your recent lab test findings based on standard clinical reference ranges.",
        "sections": sections,
        "citations": [],
        "recommended_actions": ["Review these findings with your primary care physician.", "Maintain your current medication schedule unless advised otherwise."],
        "disclaimer": "This is an automated fallback explanation generated without LLM assistance."
    }
