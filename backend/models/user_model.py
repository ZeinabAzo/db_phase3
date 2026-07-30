from pydantic import BaseModel
from typing import Optional


class UpdateProfileRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    profile_image: Optional[str] = None