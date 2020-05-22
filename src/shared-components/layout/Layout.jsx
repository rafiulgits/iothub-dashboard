import React from "react";
import NavbarView from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = (props) => {
  return (
    <>
      <NavbarView />
      <div className="p-0">{props.children}</div>
    </>
  );
};

export default Layout;
