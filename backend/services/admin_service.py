from repositories.admin_repository import (
    get_cancelled_reserves,
    get_all_payments,
    get_ticket_reports,
    get_reserve_reports
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