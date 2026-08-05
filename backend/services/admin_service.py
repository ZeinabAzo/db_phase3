from fastapi import  HTTPException,status
from repositories.admin_repository import (
    get_cancelled_reserves,
    get_all_payments,
    get_ticket_reports,
    get_reserve_reports
    )

from repositories.admin_repository import (
    get_reserve_by_id,
    cancel_reserve,
    make_ticket_available,
    get_payment_by_reserve_id,
    create_refund,
    expire_old_reserves
)

def get_cancelled_reserves_service():

    reserves = get_cancelled_reserves()

    return {
        "success": True,
        "count": len(reserves),
        "reserves": reserves
    }

def get_all_payments_service():

    payments = get_all_payments()

    return {
        "success": True,
        "count": len(payments),
        "payments": payments
    }

def get_ticket_reports_service():

    reports = get_ticket_reports()

    return {
        "success": True,
        "count": len(reports),
        "reports": reports
    }

from repositories.admin_repository import get_reserve_reports


def get_reserve_reports_service():

    reports = get_reserve_reports()

    return {
        "success": True,
        "count": len(reports),
        "reports": reports
    }

def cancel_reserve_by_admin_service(
    reserve_id: int,
    reason: str | None = None
):
    #1) Expiring old reservations
    expire_old_reserves()

    #2) Find a reservation
    reserve = get_reserve_by_id(reserve_id)

    if reserve is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reserve not found"
        )

    #3) Check reservation status
    if reserve["status"] in ["cancelled", "expired"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reserve is already closed"
        )

    #4) Cancel reservation
    cancel_reserve(reserve_id)

    #5) Releasing the ticket
    make_ticket_available(
        reserve["ticket_id"]
    )

    refund_created = False

    #6) Making a refund if payment is successful
    if reserve["status"] == "confirmed":

        payment = get_payment_by_reserve_id(
            reserve_id
        )

        if payment is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Payment not found"
            )

        create_refund(
            payment_id=payment["payment_id"],
            amount=payment["amount"],
            reason="canceled by admin -> "+ reason
        )

        refund_created = True

    return {
        "success": True,
        "reserve_id": reserve_id,
        "refund_created": refund_created
    }

def get_reserve_by_id_service(
    reserve_id: int
):

    reserve = get_reserve_by_id(reserve_id)

    if reserve is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reserve not found"
        )

    return {
        "success": True,
        "reserve": reserve
    }

from repositories.admin_repository import (
    get_dashboard_stats_repository
)

def get_dashboard_stats_service():

    stats = get_dashboard_stats_repository()

    return {

        "success": True,

        "data": stats

    }



