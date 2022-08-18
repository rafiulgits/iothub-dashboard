import React from "react";
import LoginContainer from "../../components/login/LoginContainer";
import { Switch, Route } from "react-router-dom";

const AuthenticationRoute = () => {
  return (
    <Switch>
      <Route path="/login" exact component={LoginContainer} />
    </Switch>
  );
};

export default AuthenticationRoute;
