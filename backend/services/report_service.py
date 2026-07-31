from repositories.report_repository import create_ticket_report, create_reserve_report


def submit_ticket_report(
    user_id: int, ticket_id: int, issue_type: str, description: str
):
    try:
        report_id = create_ticket_report(
            ticket_id=ticket_id,
            reporter_id=user_id,
            issue_type=issue_type,
            description=description,
        )

        return {
            "success": True,
            "report_id": report_id,
            "message": "Your issue report has been successfully submitted and will be reviewed by support.",
        }

    except Exception as e:
        return {
            "success": False,
            "message": "An error occurred while submitting the report. Please check the ticket ID.",
        }

def submit_reserve_report(user_id: int, reserve_id: int, issue_type: str, description: str):
    try:
        report_id = create_reserve_report(
            reserve_id=reserve_id,
            reporter_id=user_id,
            issue_type=issue_type,
            description=description
        )

        return {
            "success": True,
            "report_id": report_id,
            "message": "Your reservation issue report has been successfully submitted and will be reviewed by support."
        }

    except Exception as e:
        return {
            "success": False,
            "message": "An error occurred while submitting the report. Please check the reservation ID."
        }