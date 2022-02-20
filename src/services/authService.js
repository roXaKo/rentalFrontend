import http from "./httpService";
import jwtDecode from "jwt-decode";
import config from "../config.json";
import { toast } from 'react-toastify';

http.setJwt(getJwt())

export async function login(user) {
  try {
    const { data } = await http.post(`${config.apiUrl}/auth`, user);
    toast(`Welcome back ${data.name}`)
    localStorage.setItem(config.jwt, data.token);
    
  } catch (ex) {
    toast(ex.response.data)
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(config.jwt, jwt);
}
export function getJwt() {
  return localStorage.getItem(config.jwt);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(config.jwt);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(config.jwt);
}
