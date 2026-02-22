import re
import json
import httpx
from typing import List, Dict, Optional
from app.config import settings

# Common medical test patterns for extraction
COMMON_TESTS = {
    # Hematology / CBC
    "hemoglobin": {"unit": "g/dL", "ref": "12.0-17.5", "category": "Hematology"},
    "hgb": {"unit": "g/dL", "ref": "12.0-17.5", "category": "Hematology"},
    "hematocrit": {"unit": "%", "ref": "36-51", "category": "Hematology"},
    "hct": {"unit": "%", "ref": "36-51", "category": "Hematology"},
    "rbc": {"unit": "M/uL", "ref": "4.0-5.5", "category": "Hematology"},
    "red blood cell": {"unit": "M/uL", "ref": "4.0-5.5", "category": "Hematology"},
    "wbc": {"unit": "K/uL", "ref": "4.5-11.0", "category": "Hematology"},
    "white blood cell": {"unit": "K/uL", "ref": "4.5-11.0", "category": "Hematology"},
    "platelet": {"unit": "K/uL", "ref": "150-400", "category": "Hematology"},
    "plt": {"unit": "K/uL", "ref": "150-400", "category": "Hematology"},
    "mcv": {"unit": "fL", "ref": "80-100", "category": "Hematology"},
    "mch": {"unit": "pg", "ref": "27-31", "category": "Hematology"},
    "mchc": {"unit": "g/dL", "ref": "32-36", "category": "Hematology"},
    "esr": {"unit": "mm/hr", "ref": "0-20", "category": "Hematology"},
    # Metabolic Panel
    "glucose": {"unit": "mg/dL", "ref": "70-100", "category": "Metabolic"},
    "fasting glucose": {"unit": "mg/dL", "ref": "70-100", "category": "Metabolic"},
    "blood sugar": {"unit": "mg/dL", "ref": "70-100", "category": "Metabolic"},
    "hba1c": {"unit": "%", "ref": "4.0-5.6", "category": "Metabolic"},
    "glycated hemoglobin": {"unit": "%", "ref": "4.0-5.6", "category": "Metabolic"},
    "creatinine": {"unit": "mg/dL", "ref": "0.7-1.3", "category": "Kidney"},
    "bun": {"unit": "mg/dL", "ref": "7-20", "category": "Kidney"},
    "blood urea nitrogen": {"unit": "mg/dL", "ref": "7-20", "category": "Kidney"},
    "urea": {"unit": "mg/dL", "ref": "15-40", "category": "Kidney"},
    "uric acid": {"unit": "mg/dL", "ref": "3.5-7.2", "category": "Kidney"},
    "sodium": {"unit": "mEq/L", "ref": "136-145", "category": "Electrolytes"},
    "potassium": {"unit": "mEq/L", "ref": "3.5-5.0", "category": "Electrolytes"},
    "chloride": {"unit": "mEq/L", "ref": "98-106", "category": "Electrolytes"},
    "calcium": {"unit": "mg/dL", "ref": "8.5-10.5", "category": "Electrolytes"},
    # Lipid Panel
    "total cholesterol": {"unit": "mg/dL", "ref": "<200", "category": "Lipid"},
    "cholesterol": {"unit": "mg/dL", "ref": "<200", "category": "Lipid"},
    "hdl": {"unit": "mg/dL", "ref": ">40", "category": "Lipid"},
    "ldl": {"unit": "mg/dL", "ref": "<100", "category": "Lipid"},
    "triglycerides": {"unit": "mg/dL", "ref": "<150", "category": "Lipid"},
    "vldl": {"unit": "mg/dL", "ref": "5-40", "category": "Lipid"},
    # Liver Function
    "sgot": {"unit": "U/L", "ref": "10-40", "category": "Liver"},
    "ast": {"unit": "U/L", "ref": "10-40", "category": "Liver"},
    "sgpt": {"unit": "U/L", "ref": "7-56", "category": "Liver"},
    "alt": {"unit": "U/L", "ref": "7-56", "category": "Liver"},
    "alkaline phosphatase": {"unit": "U/L", "ref": "44-147", "category": "Liver"},
    "alp": {"unit": "U/L", "ref": "44-147", "category": "Liver"},
    "total bilirubin": {"unit": "mg/dL", "ref": "0.1-1.2", "category": "Liver"},
    "bilirubin": {"unit": "mg/dL", "ref": "0.1-1.2", "category": "Liver"},
    "direct bilirubin": {"unit": "mg/dL", "ref": "0.0-0.3", "category": "Liver"},
    "albumin": {"unit": "g/dL", "ref": "3.5-5.5", "category": "Liver"},
    "total protein": {"unit": "g/dL", "ref": "6.0-8.3", "category": "Liver"},
    "ggt": {"unit": "U/L", "ref": "9-48", "category": "Liver"},
    # Thyroid
    "tsh": {"unit": "mIU/L", "ref": "0.4-4.0", "category": "Thyroid"},
    "t3": {"unit": "ng/dL", "ref": "80-200", "category": "Thyroid"},
    "t4": {"unit": "ug/dL", "ref": "5.0-12.0", "category": "Thyroid"},
    "free t3": {"unit": "pg/mL", "ref": "2.0-4.4", "category": "Thyroid"},
    "free t4": {"unit": "ng/dL", "ref": "0.8-1.8", "category": "Thyroid"},
    # Iron Studies
    "iron": {"unit": "ug/dL", "ref": "60-170", "category": "Iron Studies"},
    "ferritin": {"unit": "ng/mL", "ref": "12-300", "category": "Iron Studies"},
    "tibc": {"unit": "ug/dL", "ref": "250-370", "category": "Iron Studies"},
    # Vitamins
    "vitamin d": {"unit": "ng/mL", "ref": "30-100", "category": "Vitamins"},
    "vitamin b12": {"unit": "pg/mL", "ref": "200-900", "category": "Vitamins"},
    "folate": {"unit": "ng/mL", "ref": "2.7-17.0", "category": "Vitamins"},
    "folic acid": {"unit": "ng/mL", "ref": "2.7-17.0", "category": "Vitamins"},
}

def parse_reference_range(ref_str: str):
    """Parse reference range string into min/max values."""
    if not ref_str:
        return None, None
    ref_str = ref_str.strip()
    # Handle < or > ranges
    lt = re.match(r'[<≤]\s*(\d+\.?\d*)', ref_str)
    if lt:
        return None, float(lt.group(1))
    gt = re.match(r'[>≥]\s*(\d+\.?\d*)', ref_str)
    if gt:
        return float(gt.group(1)), None
    # Handle range like "70-100"
    rng = re.match(r'(\d+\.?\d*)\s*[-–—to]\s*(\d+\.?\d*)', ref_str)
    if rng:
        return float(rng.group(1)), float(rng.group(2))
    return None, None

def determine_status(value: float, ref_range: str) -> str:
    """Determine if a value is normal, low, high, or critical."""
    low, high = parse_reference_range(ref_range)
    if low is None and high is None:
        return "normal"
    if low is not None and value < low:
        return "critical" if value < low * 0.7 else "low"
    if high is not None and value > high:
        return "critical" if value > high * 1.5 else "high"
    return "normal"

def extract_findings(ocr_text: str) -> List[Dict]:
    """Extract structured findings from OCR text using regex patterns."""
    findings = []
    lines = ocr_text.split('\n')
    
    for line in lines:
        line_clean = line.strip()
        if not line_clean:
            continue
        
        # Pattern: Test Name ... Value (Unit) ... Reference Range
        # Try multiple patterns
        for test_key, test_info in COMMON_TESTS.items():
            pattern = re.compile(
                rf'({re.escape(test_key)})\s*[:\.\-\|]?\s*(\d+\.?\d*)\s*({re.escape(test_info["unit"])})?',
                re.IGNORECASE
            )
            match = pattern.search(line_clean)
            if match:
                value_str = match.group(2)
                try:
                    value_num = float(value_str)
                except ValueError:
                    continue
                
                ref = test_info["ref"]
                status = determine_status(value_num, ref)
                
                # Avoid duplicates
                already = any(f["test_name"].lower() == test_key.lower() for f in findings)
                if not already:
                    findings.append({
                        "test_name": test_key.upper() if len(test_key) <= 4 else test_key.title(),
                        "value": value_str,
                        "unit": test_info["unit"],
                        "reference_range": ref,
                        "status": status,
                        "category": test_info["category"],
                        "confidence": 0.85
                    })
    
    # If no findings from regex, try a generic numeric extraction pattern
    if not findings:
        generic_pattern = re.compile(
            r'([A-Za-z][A-Za-z\s\.]{2,30}?)\s*[:\.\-\|]+\s*(\d+\.?\d*)\s*([A-Za-z/%]+)?\s*(?:[\(\[]?\s*(\d+\.?\d*\s*[-–]\s*\d+\.?\d*)\s*[\)\]]?)?'
        )
        for line in lines:
            matches = generic_pattern.findall(line)
            for m in matches:
                test_name = m[0].strip()
                value = m[1]
                unit = m[2] if m[2] else ""
                ref = m[3] if m[3] else ""
                
                try:
                    value_num = float(value)
                except ValueError:
                    continue
                
                status = "normal"
                if ref:
                    status = determine_status(value_num, ref)
                
                findings.append({
                    "test_name": test_name.title(),
                    "value": value,
                    "unit": unit,
                    "reference_range": ref if ref else "N/A",
                    "status": status,
                    "category": "General",
                    "confidence": 0.6
                })
    
    return findings

async def classify_document_type(ocr_text: str) -> str:
    """Classify the document as lab_report, prescription, or advice."""
    prompt = f"""
    Classify the following medical document text into exactly one of three categories:
    1. "lab_report": Contains laboratory test names with numerical results and reference ranges (e.g., Blood reports).
    2. "prescription": Contains doctor's prescriptions with medication names, dosages (e.g., mg, ml), and frequencies (e.g., 1-0-1).
    3. "advice": Contains general clinical advice, symptoms, or non-drug recommendations.

    Return ONLY the category name.

    TEXT:
    {ocr_text[:2000]}
    """
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{settings.OPENROUTER_BASE_URL}/chat/completions",
                headers={"Authorization": f"Bearer {settings.OPENROUTER_API_KEY}", "Content-Type": "application/json"},
                json={
                    "model": settings.OPENROUTER_MODEL,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.0
                }
            )
            response.raise_for_status()
            category = response.json()["choices"][0]["message"]["content"].strip().lower()
            if "lab_report" in category: return "lab_report"
            if "prescription" in category: return "prescription"
            if "advice" in category: return "advice"
            return "lab_report"
    except Exception:
        return "lab_report"

async def extract_lab_report_ai(ocr_text: str) -> List[Dict]:
    """Specialized extractor for laboratory findings."""
    prompt = f"""
    Analyze the following OCR text and extract ONLY laboratory test results.
    Return a JSON array of objects with: test_name, value, unit, reference_range, status, category, confidence.
    
    OCR TEXT:
    {ocr_text}
    """
    return await _call_gemini_json(prompt)

async def extract_prescription_ai(ocr_text: str) -> List[Dict]:
    """Specialized extractor for medications and dosages."""
    prompt = f"""
    Analyze the following OCR text and extract ONLY medications/prescriptions.
    IGNORE headers, clinic names, and administrative details.
    
    Return a JSON array of objects with:
    - name: Medication name (e.g., Augmentin)
    - dosage: Strength (e.g., 625mg)
    - frequency: How often (e.g., 1-0-1 or Twice daily)
    - duration: How long (e.g., 5 days)
    - instructions: Special notes (e.g., After meals)

    OCR TEXT:
    {ocr_text}
    """
    return await _call_gemini_json(prompt)

async def _call_gemini_json(prompt: str) -> List[Dict]:
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{settings.OPENROUTER_BASE_URL}/chat/completions",
                headers={"Authorization": f"Bearer {settings.OPENROUTER_API_KEY}", "Content-Type": "application/json"},
                json={
                    "model": settings.OPENROUTER_MODEL,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.0,
                    "response_format": { "type": "json_object" } if "gemini-2.0-flash" in settings.OPENROUTER_MODEL else None
                }
            )
            response.raise_for_status()
            content = response.json()["choices"][0]["message"]["content"]
            if "```json" in content: content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content: content = content.split("```")[1].split("```")[0].strip()
            data = json.loads(content)
            if isinstance(data, dict):
                for val in data.values():
                    if isinstance(val, list): return val
            return data if isinstance(data, list) else []
    except Exception:
        return []
