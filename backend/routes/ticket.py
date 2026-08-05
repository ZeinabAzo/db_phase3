from fastapi import APIRouter, HTTPException
from services.ticket_service import search_ticket, get_ticket_details
from services import ticket_service


router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)



@router.get("/search_ticket")
def search(
    city: str | None = None,
    sport_type: str | None = None,
    venue: str | None = None,
    home_team: str | None = None,
    away_team: str | None = None,
    date: str | None = None,
    ticket_type: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    query: str | None = None
):

    return search_ticket(
        city,
        sport_type,
        venue,
        home_team,
        away_team,
        date,
        ticket_type,
        min_price,
        max_price,
        query
    )



@router.get("/{ticket_id}")
def get_single_ticket(ticket_id: int):

    result = get_ticket_details(ticket_id)

    if not result["success"]:
        raise HTTPException(
            status_code=404,
            detail=result["message"]
        )

    return result



@router.get("/match/{match_id}")
def get_tickets_for_match(match_id: int):

    return ticket_service.get_match_tickets(
        match_id
    )