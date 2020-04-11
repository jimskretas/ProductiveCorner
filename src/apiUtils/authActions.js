import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";

export function login(data) {
  const options = {
    url: "https://productive-corner.herokuapp.com/api/user/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: data,
    crossdomain: true
  };

  return axios(options)
    .then(response => {
      const token = response.data;
      setAuthorizationToken(token);
      return 1;
    })
    .catch(err => {
      if (err.response) {
        return err.response.data;
      } else {
        return err.message;
      }
    });
}

export function register(data) {
  const options = {
    url: "https://productive-corner.herokuapp.com/api/user/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: data,
    crossdomain: true
  };

  return axios(options)
    .then(response => {
      return 1;
    })
    .catch(err => {
      if (err.response) {
        return err.response.data;
      } else {
        return err.message;
      }
    });
}

export function logout() {
  window.localStorage.clear();
}
