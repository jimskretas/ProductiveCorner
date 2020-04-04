import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./isAuthenticated";

const BoardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated() ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default BoardRoute;
