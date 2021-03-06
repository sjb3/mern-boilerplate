import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  console.log(">>> user action");
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
