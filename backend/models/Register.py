from pydantic import BaseModel
from typing import Literal


class RegisterRequest(BaseModel):
    identifier: str
    identifier_type: Literal["phone", "email"]
    first_name: str
    last_name: str
    password: str