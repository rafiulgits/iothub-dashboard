import React from "react";
import AuthenticationRoute from "./routes/AuthenticationRoute";
import AppRoutes from "./routes/AppRoutes";

const RootRoute = () => {
  return (
    <React.Fragment>
      <AuthenticationRoute />
      <AppRoutes />
    </React.Fragment>
  );
};

export default RootRoute;
