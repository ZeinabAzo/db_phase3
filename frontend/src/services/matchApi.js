import api from "./api";


export function getMatches(page = 1) {

    return api.get(
        `/matches?page=${page}`
    );

}


export function getMatchById(matchId) {

    return api.get(
        `/matches/${matchId}`
    );

}


export function createMatch(data) {

    return api.post(
        "/matches",
        data
    );

}


export function updateMatch(matchId, data) {

    return api.patch(
        `/matches/${matchId}`,
        data
    );

}