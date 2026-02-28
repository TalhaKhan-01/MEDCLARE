from datetime import datetime
from typing import Optional, List, Any
from pydantic import BaseModel

# ── Auth ──
class UserCreate(BaseModel):
    email: str
    name: str
    password: str
    role: str = "patient"

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: str
    email: str
    name: str
    role: str
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

# ── Findings ──
class FindingOut(BaseModel):
    id: str
    test_name: str
    value: str
    unit: Optional[str] = None
    reference_range: Optional[str] = None
    status: str
    category: Optional[str] = None
    confidence: float
    class Config:
        from_attributes = True

# ── Medications ──
class MedicationOut(BaseModel):
    id: str
    name: str
    dosage: Optional[str] = None
    frequency: Optional[str] = None
    duration: Optional[str] = None
    instructions: Optional[str] = None
    class Config:
        from_attributes = True

# ── Report ──
class ReportOut(BaseModel):
    id: str
    patient_id: str
    title: str
    file_type: str
    status: str
    ocr_confidence: Optional[float] = None
    explanation_text: Optional[str] = None
    explanation_sections: Optional[Any] = None
    citations: Optional[list] = None
    confidence_scores: Optional[Any] = None
    overall_confidence: Optional[float] = None
    guardrail_flags: Optional[list] = None
    personalization_level: str
    verification_status: Optional[str] = None
    verified_by: Optional[str] = None
    verified_at: Optional[datetime] = None
    doctor_notes: Optional[str] = None
    report_type: str
    lang: str
    review_requested: bool = False
    patient_note: Optional[str] = None
    findings: List[FindingOut] = []
    medications: List[MedicationOut] = []
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class ReportListOut(BaseModel):
    id: str
    title: str
    status: str
    file_type: str
    overall_confidence: Optional[float] = None
    verification_status: Optional[str] = None
    review_requested: bool = False
    patient_name: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

# ── Verification ──
class VerifyRequest(BaseModel):
    action: str  # approve|reject
    notes: Optional[str] = None

class EditExplanationRequest(BaseModel):
    explanation_text: str
    notes: Optional[str] = None

class VersionOut(BaseModel):
    id: str
    version: int
    explanation_text: str
    edited_by: Optional[str] = None
    edit_type: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

# ── Processing ──
class ProcessRequest(BaseModel):
    personalization_level: str = "standard"
    lang: str = "en"

# ── Evaluation ──
class EvaluationRunRequest(BaseModel):
    gold_standard: Optional[str] = None

class EvaluationOut(BaseModel):
    id: str
    report_id: str
    completeness_score: float
    safety_score: float
    citation_density: float
    hallucination_risk: float
    overall_score: float
    grade: str
    details: Optional[Any] = None
    evaluated_by: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

# ── Trends ──
class TrendDataPoint(BaseModel):
    report_id: str
    date: Optional[str] = None
    value: str
    numeric_value: Optional[float] = None
    unit: str = ""
    status: str = "unknown"
    reference_range: str = ""
    is_current: bool = False

class TrendStats(BaseModel):
    min: float
    max: float
    average: float
    measurement_count: int

class TrendItem(BaseModel):
    parameter: str
    direction: str
    change_percent: float
    current_value: str
    previous_value: str
    unit: str = ""
    current_status: str = "unknown"
    data_points: List[TrendDataPoint] = []
    stats: Optional[TrendStats] = None

class TrendsOut(BaseModel):
    has_history: bool
    report_count: int
    trends: List[TrendItem] = []
    summary: str = ""
    improving_count: Optional[int] = 0
    worsening_count: Optional[int] = 0
    stable_count: Optional[int] = 0
