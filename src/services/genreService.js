import http from "./httpService";
import config from "../config.json"

export async function getGenres() {
  const res = await http.get(`${config.apiUrl}/genres`);
  return res.data;
}
