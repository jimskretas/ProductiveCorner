import jwt from "jwt-decode";

export function isAuthenticated() {
  let token = localStorage.getItem("jwtToken");
  if (token) {
    let tokenExpiration = jwt(token).exp;
    let dateNow = new Date();

    return !(tokenExpiration < dateNow.getTime() / 1000);
  }
  return false;
}
