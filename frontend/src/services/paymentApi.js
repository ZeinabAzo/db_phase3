import api from "./api";

export function requestPayment(reserve_id) {

    return api.post(
        "/payments/request",
        {
            reserve_id: reserve_id,
            payment_method: "credit_card"
        }
    );

}

export function paymentCallback(transaction_id) {

    return api.post(
        "/payments/callback",
        {
            transaction_id: transaction_id,
            status: "completed"
        }
    );

}