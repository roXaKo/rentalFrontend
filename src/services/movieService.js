import http from "./httpService";
import config from "../config.json"

export async function getMovies() {
  const res = await http.get(`${config.apiUrl}/movies`);
  return res.data;
}
export async function getMovie(id) {
  const res = await http.get(`${config.apiUrl}/movies/${id}`);
  return res.data;
}
export async function deleteMovie(id) {
  const res = await http.delete(`${config.apiUrl}/movies/${id}`);
  return res.data;
}

export async function postMovie(movie) {
  const res = await http.post(`${config.apiUrl}/movies/new`, movie);
  return res.data;
}
export async function putMovie(movie) {
  const res = await http.put(`${config.apiUrl}/movies/${movie._id}`, movie);
  return res.data;
}
