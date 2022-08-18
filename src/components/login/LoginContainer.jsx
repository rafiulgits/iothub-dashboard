import React from "react";
import Layout from "../../shared-components/layout/Layout";
import AuthApi from "../../apis/AuthApi";
import Loader from "../../shared-components/loader/Loader";
import UserManager from "../../services/UserManager";
import { LoginForm, Error } from "./LoginView";
import { Container, Row, Col } from "react-bootstrap";

const ViewContainer = (props) => {
  return (
    <Container fluid>
      <Row className="d-flex justify-content-center">
        <Col sm="4" className="list-group-item shadow mt-4 p-5">
          <h5 align="center">Login</h5>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default class LoginContainer extends React.Component {
  state = {
    hasError: false,
    errorMessage: "",
    isRequesting: false,
  };

  onSubmit = (data) => {
    this.setState({ isRequesting: true });
    AuthApi.login(data)
      .then((res) => {
        this.setState({ isRequesting: false });
        UserManager.setToken(res.data.bearer);
        window.location.replace("/");
      })
      .catch((err) => {
        this.setState({ isRequesting: false });
        if (err.response) {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <Layout>
        <Loader show={this.state.isRequesting} />
        <ViewContainer>
          <Error message={this.state.errorMessage} show={this.state.hasError} />
          <LoginForm onSubmit={this.onSubmit} />
        </ViewContainer>
      </Layout>
    );
  }
}
