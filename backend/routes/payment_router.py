from fastapi import APIRouter, Depends

from models.payment_model import (
    PaymentRequest,
    PaymentCallbackRequest
)

from services.payment_service import (
    request_payment_service,
    payment_callback_service,
    get_payment_service
)

from utils.dependencies import get_current_user


router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post("/request")
def request_payment(
    data: PaymentRequest,
    user_id: int = Depends(get_current_user)
):
    return request_payment_service(
        reserve_id=data.reserve_id,
        payment_method=data.payment_method,
        user_id=user_id
    )


@router.post("/callback")
def payment_callback(
    data: PaymentCallbackRequest
):
    return payment_callback_service(
    transaction_id=data.transaction_id,
    payment_status=data.status
)


@router.get("/{payment_id}")
def get_payment(
    payment_id: int,
    user_id: int = Depends(get_current_user)
):
    return get_payment_service(
        payment_id=payment_id,
        user_id=user_id
    )