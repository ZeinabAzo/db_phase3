from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import Optional
from services.auth_service import (
    signup_user,
    verify_signup,
    generate_and_save_otp,
    verify_otp_code,
    register_user,
    login_user,
    send_signin_otp,
    verify_signin_otp
)
from models.Register import RegisterRequest
from models.auth_model import (
    OTPRequest , 
    VerifyOTPRequest,
    SignUpRequest,
    VerifySignUpRequest
)
from models.user_model import LoginRequest
router = APIRouter(prefix="/auth", tags=["Auth"])

#---------------------------------------------------------------------------------------------------------------
@router.post("/signin/send-otp")
def send_login_otp(request: OTPRequest, background_tasks: BackgroundTasks):

    result = send_signin_otp(
        identifier=request.identifier,
        identifier_type=request.identifier_type,
        bg_tasks=background_tasks
    )

    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    return result


@router.post("/signin/verify-otp")
def verify_login_otp(request: VerifyOTPRequest):

    result = verify_signin_otp(
        identifier=request.identifier,
        identifier_type=request.identifier_type,
        otp_code=request.code
    )

    if not result["success"]:
        raise HTTPException(
            status_code=401,
            detail=result["message"]
        )

    return result



# @router.post("/register")
# def register(request: RegisterRequest):

#     # Pass the registration data to the service layer
#     # The service handles OTP verification, password hashing,
#     # user creation, and JWT token generation

#     result = register_user(
#         identifier=request.identifier,
#         identifier_type=request.identifier_type,
#         first_name=request.first_name,
#         last_name=request.last_name,
#         password=request.password,
#         city=request.city,
#         role=request.role
#     )

#     # Return an HTTP 400 error if the registration process fails

#     if not result["success"]:
#         raise HTTPException(
#             status_code=400,
#             detail=result["message"]
#         )
#     # Return the registration result, including the JWT access token

#     return result
#--------------------------------------------------------------------------------





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


@router.post("/signup")
def signup(request: SignUpRequest, background_tasks: BackgroundTasks):

    result = signup_user(
        identifier=request.identifier,
        identifier_type=request.identifier_type,
        first_name=request.first_name,
        last_name=request.last_name,
        password=request.password,
        city=request.city,
        role=request.role,
        bg_tasks=background_tasks
    )

    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    return result


@router.post("/signup/verify")
def signup_verify(request: VerifySignUpRequest):

    result = verify_signup(
        identifier=request.identifier,
        code=request.code
    )

    if not result["success"]:
        raise HTTPException(

            status_code=400,
            detail=result["message"]
        )

    return result