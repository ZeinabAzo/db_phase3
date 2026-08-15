import api from "./api";


export function getTicketsByMatch(match_id) {

    return api.get(`/tickets/match/${match_id}`);

}





export function searchTickets(filters) {


    const params = {};


    Object.keys(filters).forEach((key) => {


        if (
            filters[key] !== ""
            &&
            filters[key] !== null
            &&
            filters[key] !== undefined
        ) {

            params[key] = filters[key];

        }


    });


    return api.get(
        "/tickets/search_ticket",
        {
            params
        }
    );


}