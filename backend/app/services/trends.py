"""Historical Trend Analysis — cross-references patient's reports over time."""
from typing import Dict, List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import asc
from app.models import Report, StructuredFinding


def analyze_trends(patient_id: str, current_report_id: str, db: Session) -> Dict:
    """
    Analyze historical trends for a patient's lab parameters across all their reports.
    Returns trend data per parameter with direction, change %, and historical data points.
    """
    # Get all reports for this patient, ordered by creation date
    reports = (
        db.query(Report)
        .filter(Report.patient_id == patient_id)
        .filter(Report.report_type == "lab_report")
        .filter(Report.status.in_(["explained", "verified", "edited"]))
        .order_by(asc(Report.created_at))
        .all()
    )

    if len(reports) < 2:
        return {
            "has_history": False,
            "report_count": len(reports),
            "trends": [],
            "summary": "Not enough historical reports for trend analysis. Upload more reports to see trends."
        }

    # Collect all findings grouped by test_name across reports
    parameter_history: Dict[str, List[Dict]] = {}

    for report in reports:
        findings = (
            db.query(StructuredFinding)
            .filter(StructuredFinding.report_id == report.id)
            .all()
        )
        for finding in findings:
            name = finding.test_name
            if name not in parameter_history:
                parameter_history[name] = []

            # Try to parse numeric value
            numeric_val = _parse_numeric(finding.value)

            parameter_history[name].append({
                "report_id": report.id,
                "date": report.created_at.isoformat() if report.created_at else None,
                "value": finding.value,
                "numeric_value": numeric_val,
                "unit": finding.unit or "",
                "status": finding.status or "unknown",
                "reference_range": finding.reference_range or "",
                "is_current": report.id == current_report_id
            })

    # Compute trends for each parameter
    trends = []
    for param_name, data_points in parameter_history.items():
        if len(data_points) < 2:
            continue  # Need at least 2 points for a trend

        # Only consider data points with numeric values
        numeric_points = [dp for dp in data_points if dp["numeric_value"] is not None]
        if len(numeric_points) < 2:
            continue

        latest = numeric_points[-1]
        previous = numeric_points[-2]

        # Calculate trend direction and change
        change_pct = _calculate_change(previous["numeric_value"], latest["numeric_value"])
        direction = _determine_direction(change_pct)

        # Calculate min, max, average
        values = [dp["numeric_value"] for dp in numeric_points]
        avg_val = sum(values) / len(values)

        trends.append({
            "parameter": param_name,
            "direction": direction,
            "change_percent": round(change_pct, 1),
            "current_value": latest["value"],
            "previous_value": previous["value"],
            "unit": latest["unit"],
            "current_status": latest["status"],
            "data_points": data_points,
            "stats": {
                "min": round(min(values), 2),
                "max": round(max(values), 2),
                "average": round(avg_val, 2),
                "measurement_count": len(numeric_points)
            }
        })

    # Sort: most significant changes first
    trends.sort(key=lambda t: abs(t["change_percent"]), reverse=True)

    # Build summary
    improving = [t for t in trends if _is_improving(t)]
    worsening = [t for t in trends if _is_worsening(t)]
    stable = [t for t in trends if t["direction"] == "stable"]

    summary_parts = []
    if improving:
        summary_parts.append(f"{len(improving)} parameter(s) improving")
    if worsening:
        summary_parts.append(f"{len(worsening)} parameter(s) need attention")
    if stable:
        summary_parts.append(f"{len(stable)} parameter(s) stable")

    return {
        "has_history": True,
        "report_count": len(reports),
        "trends": trends,
        "summary": ". ".join(summary_parts) if summary_parts else "No significant trends detected.",
        "improving_count": len(improving),
        "worsening_count": len(worsening),
        "stable_count": len(stable)
    }


def _parse_numeric(value: str) -> Optional[float]:
    """Try to extract a numeric value from a string."""
    if not value:
        return None
    try:
        # Remove common non-numeric chars
        cleaned = value.strip().replace(",", "").replace(" ", "")
        # Handle ranges like "4.0-10.0" — take the first number
        if "-" in cleaned and not cleaned.startswith("-"):
            cleaned = cleaned.split("-")[0]
        return float(cleaned)
    except (ValueError, TypeError):
        return None


def _calculate_change(previous: float, current: float) -> float:
    """Calculate percentage change between two values."""
    if previous == 0:
        return 0.0 if current == 0 else 100.0
    return ((current - previous) / abs(previous)) * 100


def _determine_direction(change_pct: float) -> str:
    """Determine trend direction from percentage change."""
    if change_pct > 5.0:
        return "rising"
    elif change_pct < -5.0:
        return "falling"
    else:
        return "stable"


def _is_improving(trend: Dict) -> bool:
    """Check if a trend represents improvement."""
    status = trend.get("current_status", "")
    direction = trend.get("direction", "")
    # High value going down = improving
    if status == "high" and direction == "falling":
        return True
    # Low value going up = improving
    if status == "low" and direction == "rising":
        return True
    # Normal and stable = good
    if status == "normal" and direction == "stable":
        return True
    return False


def _is_worsening(trend: Dict) -> bool:
    """Check if a trend represents worsening."""
    status = trend.get("current_status", "")
    direction = trend.get("direction", "")
    # High value going higher = worsening
    if status in ("high", "critical") and direction == "rising":
        return True
    # Low value going lower = worsening
    if status in ("low", "critical") and direction == "falling":
        return True
    return False
