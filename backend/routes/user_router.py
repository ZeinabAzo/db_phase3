from fastapi import APIRouter, Depends, HTTPException

from services.user_service import get_user_profile
from utils.dependencies import get_current_user
from fastapi import APIRouter, Depends, HTTPException

from models.user_model import UpdateProfileRequest
from services.user_service import (
    get_user_profile,
    update_user_profile
)
from utils.dependencies import get_current_user


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_my_profile(
    user_id: int = Depends(get_current_user)
):
    # Get the authenticated user's profile from the service layer
    result = get_user_profile(user_id)

    # Return 404 if the authenticated user does not exist
    if not result["success"]:
        raise HTTPException(
            status_code=404,
            detail=result["message"]
        )

    # Return the user's profile information
    return result["user"]

@router.put("/me")
def update_my_profile(
    request: UpdateProfileRequest,
    user_id: int = Depends(get_current_user)
):
    # Update the authenticated user's profile
    result = update_user_profile(
        user_id=user_id,
        first_name=request.first_name,
        last_name=request.last_name,
        email=request.email,
        phone=request.phone,
        profile_image=request.profile_image,
        city=request.city
    )

    # Return an error if the update was not successful
    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    return result