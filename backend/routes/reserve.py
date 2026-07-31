from fastapi import APIRouter  , Depends 
from services.reserve_service import reserve_ticket , active_reservations, reservation_history
from utils.security import get_current_user

router = APIRouter()

@router.post("/reserve_ticket")
def reserve(
    ticket_id: int,
    current_user: int = Depends(get_current_user),
):
    return reserve_ticket(current_user, ticket_id)


@router.get("/active_reservations")
def active(
    current_user: int = Depends(get_current_user),
):
    return active_reservations(current_user)


@router.get("/reservation_history")
def history(
    current_user: int = Depends(get_current_user),
):
    return reservation_history(current_user)