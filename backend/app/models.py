import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey, Enum, JSON, Integer, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

def gen_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=gen_uuid)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="patient")  # patient | doctor
    created_at = Column(DateTime, default=datetime.utcnow)
    reports = relationship("Report", back_populates="patient", foreign_keys="Report.patient_id")

class Report(Base):
    __tablename__ = "reports"
    id = Column(String, primary_key=True, default=gen_uuid)
    patient_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False, default="Medical Report")
    file_path = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    status = Column(String, nullable=False, default="uploaded")  # uploaded|processing|extracted|explained|verified|rejected
    ocr_text = Column(Text, nullable=True)
    ocr_confidence = Column(Float, nullable=True)
    extraction_json = Column(JSON, nullable=True)
    explanation_text = Column(Text, nullable=True)
    explanation_sections = Column(JSON, nullable=True)
    citations = Column(JSON, nullable=True)
    confidence_scores = Column(JSON, nullable=True)
    overall_confidence = Column(Float, nullable=True)
    guardrail_flags = Column(JSON, nullable=True)
    personalization_level = Column(String, default="standard")  # simple|standard|detailed
    reasoning_trace = Column(JSON, nullable=True)
    verified_by = Column(String, ForeignKey("users.id"), nullable=True)
    verified_at = Column(DateTime, nullable=True)
    verification_status = Column(String, nullable=True)  # approved|edited|rejected
    doctor_notes = Column(Text, nullable=True)
    report_type = Column(String, default="lab_report")  # lab_report | prescription | advice
    lang = Column(String, default="en")  # en|hi|te|ta|or|ml|bn|pa|mr
    is_deleted = Column(Boolean, default=False)
    review_requested = Column(Boolean, default=False)
    patient_note = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    patient = relationship("User", back_populates="reports", foreign_keys=[patient_id])
    findings = relationship("StructuredFinding", back_populates="report", cascade="all, delete-orphan")
    medications = relationship("Medication", back_populates="report", cascade="all, delete-orphan")
    versions = relationship("ExplanationVersion", back_populates="report", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="report", cascade="all, delete-orphan")

class StructuredFinding(Base):
    __tablename__ = "structured_findings"
    id = Column(String, primary_key=True, default=gen_uuid)
    report_id = Column(String, ForeignKey("reports.id"), nullable=False)
    test_name = Column(String, nullable=False)
    value = Column(String, nullable=False)
    unit = Column(String, nullable=True)
    reference_range = Column(String, nullable=True)
    status = Column(String, nullable=False, default="normal")  # normal|low|high|critical
    category = Column(String, nullable=True)
    confidence = Column(Float, default=1.0)
    report = relationship("Report", back_populates="findings")

class Medication(Base):
    __tablename__ = "medications"
    id = Column(String, primary_key=True, default=gen_uuid)
    report_id = Column(String, ForeignKey("reports.id"), nullable=False)
    name = Column(String, nullable=False)
    dosage = Column(String, nullable=True)
    frequency = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    instructions = Column(String, nullable=True)
    report = relationship("Report", back_populates="medications")

class ExplanationVersion(Base):
    __tablename__ = "explanation_versions"
    id = Column(String, primary_key=True, default=gen_uuid)
    report_id = Column(String, ForeignKey("reports.id"), nullable=False)
    version = Column(Integer, nullable=False, default=1)
    explanation_text = Column(Text, nullable=False)
    explanation_sections = Column(JSON, nullable=True)
    edited_by = Column(String, ForeignKey("users.id"), nullable=True)
    edit_type = Column(String, nullable=True)  # original|doctor_edit|system_update
    created_at = Column(DateTime, default=datetime.utcnow)
    report = relationship("Report", back_populates="versions")

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(String, primary_key=True, default=gen_uuid)
    report_id = Column(String, ForeignKey("reports.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    action = Column(String, nullable=False)
    details = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    report = relationship("Report", back_populates="audit_logs")

class EvaluationResult(Base):
    __tablename__ = "evaluation_results"
    id = Column(String, primary_key=True, default=gen_uuid)
    report_id = Column(String, ForeignKey("reports.id"), nullable=False)
    completeness_score = Column(Float, nullable=False, default=0.0)
    safety_score = Column(Float, nullable=False, default=0.0)
    citation_density = Column(Float, nullable=False, default=0.0)
    hallucination_risk = Column(Float, nullable=False, default=0.0)
    overall_score = Column(Float, nullable=False, default=0.0)
    grade = Column(String, nullable=False, default="C")
    details = Column(JSON, nullable=True)
    gold_standard = Column(Text, nullable=True)
    evaluated_by = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    report = relationship("Report")
