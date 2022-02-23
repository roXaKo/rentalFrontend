import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";

export async function getCustomers() {
  try {
    const res = await http.get(`${config.apiUrl}/customer`);
    return res.data;
  } catch (ex) {
    toast(ex.error);
  }
}

export async function getRentalsOfCustomer(_id) {
  try {
    const res = await http.get(`${config.apiUrl}/rental/customer/${_id}`);
    return res.data;
  } catch (ex) {
    toast(ex.error);
  }
}

export async function getCustomer(_id) {
  try {
    const res = await http.get(`${config.apiUrl}/customer/${_id}`);
    return res.data;
  } catch (ex) {
    toast(ex.error);
  }
}
export async function postCustomer(customer) {
  try {
    const res = await http.post(`${config.apiUrl}/customer/new`, customer);
    return res;
  } catch (ex) {
    toast(ex.error);
  }
}
export async function deleteCustomer(_id) {
  try {
    const res = await http.delete(`${config.apiUrl}/customer/${_id}`);
    return res;
  } catch (ex) {
    toast(ex.response.data);
    return ex;
  }
}
export async function putCustomer(_id, data) {
  try {
    const res = await http.put(`${config.apiUrl}/customer/${_id}`, data);
    return res;
  } catch (ex) {
    toast(ex.error);
  }
}
