import React from "react";
import ReactDOM from "react-dom";
import AppPage from "./components/board/AppPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BoardRoute from "./apiUtils/BoardRoute";
import LoginRoute from "./apiUtils/LoginRoute";

ReactDOM.render(
  <Router>
    <Switch>
      <LoginRoute path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <BoardRoute exact path="/" component={AppPage} />
    </Switch>
  </Router>,
  document.getElementById("app")
);
