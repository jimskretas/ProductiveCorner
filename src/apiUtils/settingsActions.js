import axios from "axios";

export function getSettings() {
  const options = {
    url: "https://productive-corner.herokuapp.com/api/settings",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": window.localStorage.getItem("jwtToken"),
    },
    crossdomain: true,
  };

  return axios(options)
    .then((response) => {
      // console.log(response.data[0].settings);
      return response.data[0].settings;
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
      return null;
    });
}

export function updateSettings(settings) {
  const options = {
    url: "https://productive-corner.herokuapp.com/api/settings/update",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": window.localStorage.getItem("jwtToken"),
    },
    data: settings,
    crossdomain: true,
  };

  return axios(options)
    .then((response) => {
      return 1; // Success!
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
      return null;
    });
}
