import React from "react";
import ProtectedRoute from "../../shared-components/protected-route/ProtectedRoute";
import DashboardContainer from "../../components/dashboard/DashboardContainer";
import CommandLineContainer from "../../components/command-line/CommandLineContainer";
import { Switch } from "react-router-dom";

const AppRoute = () => {
  return (
    <Switch>
      <ProtectedRoute path="/" exact component={DashboardContainer} />
      <ProtectedRoute path="/cli" exact component={CommandLineContainer} />
    </Switch>
  );
};

export default AppRoute;
