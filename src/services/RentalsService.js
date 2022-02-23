import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";

export async function getRentals() {
  try {
    const res = await http.get(`${config.apiUrl}/rental`);
    return res;
  } catch (ex) {
    toast(ex.error);
  }
}

export async function getRental(_id) {
  try {
    const res = await http.get(`${config.apiUrl}/rental/${_id}`);
    return res.data;
  } catch (ex) {
    toast(ex.error);
  }
}
export async function postRental(rental) {
  try {
    const res = await http.post(`${config.apiUrl}/rental/new`, rental);
    return res;
  } catch (ex) {
    toast(ex.error);
  }
}
export async function deleteRental(_id) {
  try {
    const res = await http.delete(`${config.apiUrl}/rental/${_id}`);
    return res;
  } catch (ex) {
      toast(ex.response.data)
    return ex;
  }
}
export async function putRental(_id, data) {
  try {
    const res = await http.put(`${config.apiUrl}/rental/${_id}`, data);
    return res;
  } catch (ex) {
    toast(ex.error);
  }
}

export async function returnRental(id){
  try {
    const res = await http.post(`${config.apiUrl}/returns`, id)
    return res.data
  } catch (ex) {
    toast(ex.error)
  }
}