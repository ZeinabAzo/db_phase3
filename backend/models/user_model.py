from pydantic import BaseModel
from typing import Optional


class UpdateProfileRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    profile_image: Optional[str] = None
    city: Optional[str] = None # add city to fix one tiny bug 

# add one class to register
class LoginRequest(BaseModel):
    identifier: str
    identifier_type: str  # "phone" or "email"
    password: str