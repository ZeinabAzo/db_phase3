import uuid

from fastapi import HTTPException, status

from repositories.admin_repository import expire_old_reserves , get_reserve_by_id



from repositories.payment_repository import (
    get_payment_by_transaction_id,
    update_payment_status,
    create_payment,
    get_payment_by_id,
    create_payment,
    get_pending_payment_by_reservation_id,
    complete_payment_transaction
)



def request_payment_service(
    reserve_id: int,
    payment_method: str,
    user_id: int
):

    expire_old_reserves()


    reserve = get_reserve_by_id(reserve_id)

    if reserve is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reserve not found"
        )


    if reserve["user_id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )


    if reserve["status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reserve is not pending"
        )


    transaction_id = str(uuid.uuid4())

    existing_payment = get_pending_payment_by_reservation_id(
    reserve_id
)


    if existing_payment:

        return {
            "success": True,
            "message": "Payment already exists",
            "payment_id": existing_payment["payment_id"],
            "transaction_id": existing_payment["transaction_id"]
        }


    payment_id = create_payment(
        amount=reserve["total_price"],
        payment_method=payment_method,
        transaction_id=transaction_id,
        reservation_id=reserve_id
    )


    return {
        "success": True,
        "message": "Payment request created",
        "payment_id": payment_id,
        "transaction_id": transaction_id
    }




def payment_callback_service(
    transaction_id: str,
    payment_status: str
):

    # پیدا کردن payment
    payment = get_payment_by_transaction_id(
        transaction_id
    )

    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )


    # جلوگیری از پردازش دوباره
    if payment["payment_status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment already processed"
        )


    reserve_id = payment["reservation_id"]


    # گرفتن رزرو
    reserve = get_reserve_by_id(
        reserve_id
    )

    if reserve is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reserve not found"
        )


    # پرداخت موفق
    if payment_status == "completed":

        complete_payment_transaction(
        transaction_id,
        reserve_id,
        reserve["ticket_id"]
    )


        return {
            "success": True,
            "message": "Payment completed successfully"
        }


    # پرداخت ناموفق
    elif payment_status == "failed":

        update_payment_status(
            transaction_id,
            "failed"
        )


        return {
            "success": False,
            "message": "Payment failed. Reserve is still pending."
        }


    else:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid payment status"
        )
    


def get_payment_service(
    payment_id: int,
    user_id: int
):

    payment = get_payment_by_id(
        payment_id
    )

    if payment is None:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )


    if payment["user_id"] != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )


    return {
        "success": True,
        "payment": payment
    }