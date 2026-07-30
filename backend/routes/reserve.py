from fastapi import APIRouter   
from services.reserve_service import reserve_ticket , active_reservations, reservation_history


router = APIRouter()

@router.post("/reserve_ticket")
def reserve(user_id: int, ticket_id : int):

    return reserve_ticket(user_id, ticket_id)

@router.get("/active_reservations")
def active(user_id: int):
    return active_reservations(user_id)


@router.get("/reservation_history")
def history(user_id: int):
    return reservation_history(user_id)