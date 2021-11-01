import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "ef985269-a9ea-44ef-8f52-1417dfebe658"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});

export const authAPI = {
    getMe() {return instance.get("auth/me")},
}


export const profileAPI = {
    getProfile(userId) { return instance.get("profile/" + userId)}
}