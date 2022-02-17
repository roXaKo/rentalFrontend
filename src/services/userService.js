import http from "./httpService"
import config from "../config.json"

export function register (user){
    return http.post(`${config.apiUrl}/user`,user)
}