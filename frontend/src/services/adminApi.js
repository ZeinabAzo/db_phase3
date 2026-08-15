import api from "./api";


export function getAllPayments() {

    return api.get(
        "/admin/payments"
    );

}


export function getCancelledReserves() {

    return api.get(
        "/admin/cancelled-reserves"
    );

}


export function getAllReservations() {

    return api.get(
        "/admin/reservations"
    );

}


export function getTicketReports() {

    return api.get(
        "/admin/reports/tickets"
    );

}


export function getReserveReports() {

    return api.get(
        "/admin/reports/reserves"
    );

}


export function getDashboardStats() {

    return api.get(
        "/admin/stats"
    );

}