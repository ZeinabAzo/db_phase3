from fastapi import APIRouter, Depends
from models.admin_model import CancelReserveRequest


from services.admin_service import (
    get_cancelled_reserves_service,
    get_all_payments_service,
    get_ticket_reports_service,
    get_reserve_reports_service,
    cancel_reserve_by_admin_service,
    get_reserve_by_id_service,
    get_dashboard_stats_service
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

@router.get("/reserves/{reserve_id}")
def get_reserve_by_id_endpoint(
    reserve_id: int,
    admin=Depends(get_current_admin)
):
    return get_reserve_by_id_service(reserve_id)

@router.patch("/reserves/{reserve_id}/cancel")
def cancel_reserve_endpoint(
    reserve_id: int,
    data: CancelReserveRequest,
    admin=Depends(get_current_admin)
):
    return cancel_reserve_by_admin_service(
        reserve_id,
        data.reason
    )

@router.get("/stats")
def get_stats(
    admin=Depends(get_current_admin)
):
    return get_dashboard_stats_service()
