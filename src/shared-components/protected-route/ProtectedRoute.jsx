import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserManager from "../../services/UserManager";

export default class ProtectedRoute extends React.Component {
  getView = (props) => {
    const { component: Component } = this.props;

    if (UserManager.hasToken()) {
      return <Component {...props} />;
    }
    return <Redirect to="/login" />;
  };

  render() {
    const { component: Component, ...props } = this.props;
    return <Route {...props} render={this.getView} />;
  }
}
