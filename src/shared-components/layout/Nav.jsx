import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

class NavbarView extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="/">IoTHub Dashboard</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/cli">
            <Button size="sm" variant="light">
              Command Line
            </Button>
          </Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar>
    );
  }
}

export default NavbarView;
