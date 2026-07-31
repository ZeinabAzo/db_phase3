from fastapi import APIRouter, Depends

from services.admin_service import (
    get_cancelled_reserves_service,
    get_all_payments_service,
    get_ticket_reports_service,
    get_reserve_reports_service
)

from utils.dependencies import (
    get_current_admin
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/cancelled-reserves")
def cancelled_reserves(
    admin=Depends(get_current_admin)
):
    return get_cancelled_reserves_service()

@router.get("/payments")
def payments(
    admin=Depends(get_current_admin)
):
    return get_all_payments_service()

@router.get("/reports/tickets")
def ticket_reports(
    admin=Depends(get_current_admin)
):
    return get_ticket_reports_service()

@router.get("/reports/reserves")
def reserve_reports(
    admin=Depends(get_current_admin)
):
    return get_reserve_reports_service()