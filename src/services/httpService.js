import axios from "axios";
import {toast} from "react-toastify"
import config from "../config.json"

axios.interceptors.response.use(null, error => {
  console.log(error)
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast("An error happend")
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  if (localStorage.getItem(config.jwt)){
  axios.defaults.headers.common["x-auth-token"] = jwt}
}
const http = {get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt}
export default http
