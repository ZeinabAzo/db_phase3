from fastapi import APIRouter  , Depends, HTTPException
from services.reserve_service import reserve_ticket , active_reservations, reservation_history, calculate_cancellation_penalty, cancel_ticket_and_refund , purchased_tickets
from utils.security import get_current_user
from utils.dependencies import get_current_user

router = APIRouter(
    prefix="/reserve",
    tags=["Reservations"]
)

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


@router.get("/{reserve_id}/cancellation-penalty")
def check_cancellation_penalty(
    reserve_id: int, 
    user_id: int = Depends(get_current_user)
):
    
    result = calculate_cancellation_penalty(reserve_id=reserve_id, user_id=user_id)
    
    if not result["success"]:
        raise HTTPException(status_code=result["status_code"], detail=result["message"])
        
    return result

@router.post("/{reserve_id}/cancel")
def cancel_reservation(
    reserve_id: int, 
    user_id: int = Depends(get_current_user)
):
    # cancells ticket 
    result = cancel_ticket_and_refund(reserve_id=reserve_id, user_id=user_id)
    
    if not result["success"]:
        raise HTTPException(status_code=result["status_code"], detail=result["message"])
        
    return result


@router.get("/purchased_tickets")
def purchased(current_user: int = Depends(get_current_user)):
    return purchased_tickets(current_user)