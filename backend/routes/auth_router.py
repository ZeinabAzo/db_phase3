from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.auth_service import (
    generate_and_save_otp,
    verify_otp_code,
    register_user,
    login_user
)

from models.Register import RegisterRequest
from models.user_model import LoginRequest

router = APIRouter(prefix="/auth", tags=["Auth"])

#  a class to define the request body for sending OTP, accepting either phone or email as optional fields
class OTPRequest(BaseModel):
    identifier: str
    identifier_type: str


@router.post("/send-otp")
def send_otp(request: OTPRequest):

    # call the service function to generate and save the OTP in Redis
    # we wrote this function in the auth_service.py file to handle the OTP generation and storage in Redis
    generate_and_save_otp(request.identifier)

    return {
        "status": "success",
        "message": f"OTP has been sent to {request.identifier}. Please check your console for the OTP code. Expires in 3 minutes."
    }

# a class to get verification codes

class VerifyOTPRequest(BaseModel):
    identifier: str
    identifier_type: str
    code: str
    
@router.post("/verify-otp")# api to verify otp
def verify_otp(request: VerifyOTPRequest):

    result = verify_otp_code(
        identifier=request.identifier,
        identifier_type=request.identifier_type,
        otp_code=request.code
    )

    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    return result



@router.post("/register")
def register(request: RegisterRequest):

    # Pass the registration data to the service layer
    # The service handles OTP verification, password hashing,
    # user creation, and JWT token generation

    result = register_user(
        identifier=request.identifier,
        identifier_type=request.identifier_type,
        first_name=request.first_name,
        last_name=request.last_name,
        password=request.password,
        city=request.city,
        role=request.role
    )

    # Return an HTTP 400 error if the registration process fails

    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )
    # Return the registration result, including the JWT access token

    return result


@router.post("/login")
def login(request: LoginRequest):
    result = login_user(
        identifier=request.identifier,
        identifier_type=request.identifier_type,
        password=request.password
    )
    
    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )
        
    return result
