from fastapi  import APIRouter
from services.location_service import get_locations


router = APIRouter()

@router.get("/get_locations")
def locations():
    return get_locations()