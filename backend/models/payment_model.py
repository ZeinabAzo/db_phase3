from pydantic import BaseModel
from typing import Literal


class PaymentRequest(BaseModel):
    reserve_id: int
    payment_method: Literal[
        "credit_card",
        "paypal",
        "bank_transfer"
    ]


class PaymentCallbackRequest(BaseModel):
    transaction_id: str
    status: Literal[
        "completed",
        "failed"
    ]


class PaymentResponse(BaseModel):
    payment_id: int
    amount: float
    payment_status: Literal[
        "pending",
        "completed",
        "failed"
    ]
    payment_method: Literal[
        "credit_card",
        "paypal",
        "bank_transfer"
    ]
    transaction_id: str