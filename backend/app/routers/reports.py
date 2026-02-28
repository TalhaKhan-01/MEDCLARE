import os
import uuid
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Report
from app.schemas import ReportOut, ReportListOut, ProcessRequest
from app.auth import get_current_user
from app.config import settings

router = APIRouter(prefix="/reports", tags=["Reports"])

ALLOWED_TYPES = {"application/pdf", "image/png", "image/jpeg", "image/jpg", "image/tiff"}
ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".tiff"}

@router.post("/upload", response_model=ReportOut)
async def upload_report(
    file: UploadFile = File(...),
    title: str = Form("Medical Report"),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Unsupported file type. Allowed: {ALLOWED_EXTENSIONS}")
    
    file_id = str(uuid.uuid4())
    file_path = os.path.join(settings.UPLOAD_DIR, f"{file_id}{ext}")
    
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    report = Report(
        patient_id=user.id,
        title=title,
        file_path=file_path,
        file_type=ext.replace(".", ""),
        status="uploaded"
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return ReportOut.model_validate(report)

@router.get("/", response_model=list[ReportListOut])
def list_reports(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role == "doctor":
        reports = db.query(Report).filter(Report.is_deleted == False, Report.review_requested == True).order_by(Report.created_at.desc()).all()
        result = []
        for r in reports:
            out = ReportListOut.model_validate(r)
            out.patient_name = r.patient.name if r.patient else "Unknown"
            result.append(out)
        return result
    else:
        reports = db.query(Report).filter(Report.patient_id == user.id, Report.is_deleted == False).order_by(Report.created_at.desc()).all()
        return [ReportListOut.model_validate(r) for r in reports]

@router.get("/{report_id}", response_model=ReportOut)
def get_report(report_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if user.role == "patient" and report.patient_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    return ReportOut.model_validate(report)

@router.post("/{report_id}/process", response_model=ReportOut)
async def process_report(
    report_id: str,
    body: ProcessRequest = ProcessRequest(),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if user.role == "patient" and report.patient_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    from app.services.orchestrator import run_pipeline
    report = await run_pipeline(report.id, body.personalization_level, db, lang=body.lang)
    return ReportOut.model_validate(report)

@router.get("/{report_id}/trends")
def get_report_trends(
    report_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get historical trend analysis for parameters in this report."""
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if user.role == "patient" and report.patient_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    from app.services.trends import analyze_trends
    return analyze_trends(report.patient_id, report.id, db)

@router.delete("/{report_id}")
def delete_report(report_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if user.role == "patient" and report.patient_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    report.is_deleted = True
    db.commit()
    return {"status": "success", "message": "Report marked as deleted"}

@router.post("/{report_id}/restore")
def restore_report(report_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if user.role == "patient" and report.patient_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    report.is_deleted = False
    db.commit()
    return {"status": "success", "message": "Report restored"}

@router.post("/{report_id}/request-review")
def request_review(report_id: str, data: dict, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    if user.role != "patient" or report.patient_id != user.id:
        raise HTTPException(status_code=403, detail="Only patients can request review for their own reports")
    
    report.review_requested = True
    report.patient_note = data.get("note", "")
    db.commit()
    return {"status": "success", "message": "Review requested successfully"}
