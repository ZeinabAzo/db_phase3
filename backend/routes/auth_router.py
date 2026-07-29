from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.auth_service import (
    generate_and_save_otp,
    verify_otp_code,
    register_user
)

from models.Register import RegisterRequest

router = APIRouter(prefix="/auth", tags=["Auth"])

#  a class to define the request body for sending OTP, accepting either phone or email as optional fields
class OTPRequest(BaseModel): # use base model because we want to define a request body schema for the /send-otp endpoint
    phone: Optional[str] = None
    email: Optional[str] = None

@router.post("/send-otp") # endpoint to send OTP to either phone or email
def send_otp(request: OTPRequest):
    # check if either phone or email is provided in the request body
    identifier = request.phone or request.email
    
    if not identifier:
        raise HTTPException(
            status_code=400, 
            detail="Either phone or email must be provided to send OTP."
        )
    
    # call the service function to generate and save the OTP in Redis
    # we wrote this function in the auth_service.py file to handle the OTP generation and storage in Redis
    generate_and_save_otp(identifier) 
    
    return {
        "status": "success", 
        "message": f"OTP has been sent to {identifier}. Please check your console for the OTP code.Expires in 3 minutes."
    }

# a class to get verification codes
class VerifyOTPRequest(BaseModel):
    phone: Optional[str] = None
    email: Optional[str] = None
    code: str

@router.post("/verify-otp") # api to verify otp
def verify_otp(request: VerifyOTPRequest):
    identifier = request.phone or request.email
    
    if not identifier:
        raise HTTPException(
            status_code=400, 
            detail="Either phone or email must be provided to send OTP."
        )
    
    # check verification
    result = verify_otp_code(identifier, request.code)
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])
        
    return {
        "status": "success",
        "message": result["message"]
    }



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
