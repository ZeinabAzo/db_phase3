from pydantic import BaseModel
from typing import Literal


class RegisterRequest(BaseModel):
    identifier: str
    identifier_type: str
    first_name: str
    last_name: str
    password: str

    city: str
    role: str