import api from "./api";


export function getMyProfile(){
    return api.get("/users/me");
}

export function updateProfile(data){
    return api.patch("/users/me",data);
}