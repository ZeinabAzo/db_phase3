import api from "./api";


export function reserveTicket(ticket_id) {

    return api.post(
        "/reserve/reserve_ticket",
        null,
        {
            params: {
                ticket_id: ticket_id
            }
        }
    );

}


export function getPurchasedTickets() {

    return api.get(
        "/reserve/purchased_tickets"
    );

}

export function getActiveReservations() {

    return api.get(
        "/reserve/active_reservations"
    );

}

export function cancelReservation(reserve_id) {

    return api.post(
        `/reserve/${reserve_id}/cancel`
    );

}

export function cancelTicket(reserve_id) {

    return api.post(
        `/reserve/${reserve_id}/cancel`
    );

}

export function getReservationHistory() {

    return api.get(
        "/reserve/reservation_history"
    );

}

export function getCancellationPenalty(reserve_id){

    return api.get(
        `/reserve/${reserve_id}/cancellation-penalty`
    );

}