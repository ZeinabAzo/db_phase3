import api from "./api";

export function getLocations() {

    return api.get("/get_locations");

}