import React from "react";
import UserManager from "../../services/UserManager";
import { Route, Redirect } from "react-router-dom";

export default class ProtectedRoute extends React.Component {
  getView = (props) => {
    const { component: Component } = this.props;
    if (UserManager.hasToken()) {
      return <Component {...props} />;
    }
    return <Redirect to="/login" />;
  };

  render() {
    console.log("hello");
    const { component: Component, ...props } = this.props;
    return <Route {...props} render={this.getView} />;
  }
}
