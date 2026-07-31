from pydantic import BaseModel
from typing import Optional

# a class to get verification codes

class VerifyOTPRequest(BaseModel):
    identifier: str
    identifier_type: str
    code: str

#  a class to define the request body for sending OTP, accepting either phone or email as optional fields
class OTPRequest(BaseModel):
    identifier: str
    identifier_type: str




class SignUpRequest(BaseModel):
    identifier: str
    identifier_type: str

    first_name: str
    last_name: str
    password: str

    city: str
    role: str


class VerifySignUpRequest(BaseModel):
    identifier: str
    code: str