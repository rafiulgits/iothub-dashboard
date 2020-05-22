import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

export const Error = ({ message, show }) => {
  if (show) {
    return <Alert variant="danger">{message}</Alert>;
  }
  return <></>;
};
Error.prototype = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

export const LoginForm = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (e) => {
    let data = {
      name: username,
      password: password,
    };
    props.onSubmit(data);
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          size="sm"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          size="sm"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button type="submit" size="sm" block>
        Login
      </Button>
    </form>
  );
};
