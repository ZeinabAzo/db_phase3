from fastapi import APIRouter
from services.ticket_service import search_ticket

router = APIRouter()


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
):
    return search_ticket(
        city, sport_type, venue, home_team, away_team, date, ticket_type, min_price, max_price,
    )