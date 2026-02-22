from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Report, ExplanationVersion, AuditLog
from app.schemas import VerifyRequest, EditExplanationRequest, ReportOut, VersionOut
from app.auth import get_current_user, require_role

router = APIRouter(prefix="/reports", tags=["Verification"])

@router.post("/{report_id}/verify", response_model=ReportOut)
def verify_report(
    report_id: str,
    body: VerifyRequest,
    user: User = Depends(require_role("doctor")),
    db: Session = Depends(get_db)
):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if report.status not in ("explained", "edited"):
        raise HTTPException(status_code=400, detail="Report not ready for verification")
    
    report.verification_status = body.action
    report.verified_by = user.id
    report.verified_at = datetime.utcnow()
    report.doctor_notes = body.notes
    report.status = "verified" if body.action == "approve" else "rejected"
    
    audit = AuditLog(report_id=report.id, user_id=user.id, action=f"verification_{body.action}",
                     details={"notes": body.notes})
    db.add(audit)
    db.commit()
    db.refresh(report)
    return ReportOut.model_validate(report)

@router.post("/{report_id}/edit", response_model=ReportOut)
def edit_explanation(
    report_id: str,
    body: EditExplanationRequest,
    user: User = Depends(require_role("doctor")),
    db: Session = Depends(get_db)
):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Save current as version
    current_version = db.query(ExplanationVersion).filter(
        ExplanationVersion.report_id == report.id
    ).count() + 1
    
    version = ExplanationVersion(
        report_id=report.id,
        version=current_version,
        explanation_text=body.explanation_text,
        explanation_sections=report.explanation_sections,
        edited_by=user.id,
        edit_type="doctor_edit"
    )
    db.add(version)
    
    report.explanation_text = body.explanation_text
    report.doctor_notes = body.notes
    report.status = "edited"
    
    audit = AuditLog(report_id=report.id, user_id=user.id, action="explanation_edit",
                     details={"notes": body.notes, "version": current_version})
    db.add(audit)
    db.commit()
    db.refresh(report)
    return ReportOut.model_validate(report)

@router.get("/{report_id}/versions", response_model=list[VersionOut])
def get_versions(
    report_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    versions = db.query(ExplanationVersion).filter(
        ExplanationVersion.report_id == report_id
    ).order_by(ExplanationVersion.version.desc()).all()
    return [VersionOut.model_validate(v) for v in versions]
