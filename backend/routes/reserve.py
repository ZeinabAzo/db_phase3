from fastapi import APIRouter   
from services.reserve_service import reserve_ticket

router = APIRouter()

@router.post("/reserve_ticket")
def reserve()
    return reserve_ticket()