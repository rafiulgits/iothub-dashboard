import React from "react";
import ProtectedRoute from "../../shared-components/protected-route/ProtectedRoute";
import HomeContainer from "../../components/home/HomeContainer";
import CommandLineContainer from "../../components/command-line";
import { Switch } from "react-router-dom";

const AppRoute = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" exact component={HomeContainer} />
      <ProtectedRoute path="/cli" exact component={CommandLineContainer} />
    </Switch>
  );
};

export default AppRoute;
