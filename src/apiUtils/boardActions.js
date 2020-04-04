import axios from "axios";

export function getBoard() {
  const options = {
    url: "https://productive-corner.herokuapp.com/api/board",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("jwtToken")
    },
    crossdomain: true
  };

  return axios(options)
    .then(response => {
      // console.log(response.data[0].board);
      return response.data[0].board;
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
      return null;
    });
}

export function updateBoard(board) {
  const options = {
    url: "https://productive-corner.herokuapp.com/api/board/update",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("jwtToken")
    },
    data: board,
    crossdomain: true
  };

  return axios(options)
    .then(response => {
      return 1;
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
      return null;
    });
}
