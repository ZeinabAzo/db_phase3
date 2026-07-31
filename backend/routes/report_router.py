from fastapi import APIRouter, Depends, HTTPException
from models.report_model import ReportTicketRequest, ReportReserveRequest
from services.report_service import submit_ticket_report, submit_reserve_report
from utils.dependencies import get_current_user

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

@router.post("/ticket")
def report_ticket_issue(
    request: ReportTicketRequest,
    user_id: int = Depends(get_current_user)  # get usser by JWT token
):
    result = submit_ticket_report(
        user_id=user_id,
        ticket_id=request.ticket_id,
        issue_type=request.issue_type,
        description=request.description
    )

    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])

    return result

@router.post("/reserve")
def report_reserve_issue(
    request: ReportReserveRequest,
    user_id: int = Depends(get_current_user)
):
    result = submit_reserve_report(
        user_id=user_id,
        reserve_id=request.reserve_id,
        issue_type=request.issue_type,
        description=request.description
    )

    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])

    return result