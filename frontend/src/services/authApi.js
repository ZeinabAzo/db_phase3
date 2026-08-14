import api from "./api";

export function login(data) {
    return api.post("/auth/login", data);
}

export function sendOtp(data) {
    return api.post("/auth/signin/send-otp", data);
}

export function verifyOtp(data) {
    return api.post("/auth/signin/verify-otp", data);
}


export function signup(data) {

    return api.post("/auth/signup", data);

}

export function verifySignup(data) {

    return api.post("/auth/signup/verify", data);

}