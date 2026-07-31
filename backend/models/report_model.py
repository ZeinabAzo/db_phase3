from pydantic import BaseModel
from typing import Literal

class ReportTicketRequest(BaseModel):
    ticket_id: int
    issue_type: Literal[
        "payment_issue",
        "incorrect_ticket_info",
        "seat_or_section_problem",
        "schedule_change",
        "unexpected_cancellation",
        "other",
    ]
    description: str  # user's report message 

class ReportReserveRequest(BaseModel):
    reserve_id: int
    issue_type: Literal[
        "payment_issue",
        "ticket_not_received",
        "cancellation_request",
        "incorrect_reserve_info",
        "other"
    ]
    description: str