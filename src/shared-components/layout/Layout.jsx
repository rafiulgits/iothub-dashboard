import React from "react";
import NavbarView from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = (props) => {
  return (
    <div>
      <NavbarView />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
