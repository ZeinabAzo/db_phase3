from pydantic import BaseModel


class CancelReserveRequest(BaseModel):
    reason: str | None = None