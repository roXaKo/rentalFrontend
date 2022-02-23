import http from "./httpService"
import config from "../config.json"
import { toast } from "react-toastify"

export function registerUser (user){
    return http.post(`${config.apiUrl}/user`,user)
}
export async function getMe (){
    try {
        const res= await http.get(`${config.apiUrl}/user/me`)
        return res.data
    } catch (ex) {
        toast(ex.error)
    }
}
export async function putMe(data){
    try {
        const res= await http.put(`${config.apiUrl}/user/me`, data)
        return res
    } catch (ex) {
        toast(ex.error)  
    }
}