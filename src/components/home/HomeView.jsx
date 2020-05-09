import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const UserList = ({ users }) => {
  let list = [];
  users.forEach((item, index) => {
    list.push(
      <ListGroup.Item as="li" key={index}>
        {`${item.name}`}
      </ListGroup.Item>
    );
  });
  return (
    <ListGroup as="ul">
      <ListGroup.Item active>Active Users</ListGroup.Item>
      {list}
    </ListGroup>
  );
};

const PublishBox = ({ messages }) => {
  let list = [];
  messages.forEach((item, index) => {
    list.push(
      <ListGroup.Item as="li" key={index}>
        {`${item.topic}: ${item.payload}`}
      </ListGroup.Item>
    );
  });
  return (
    <ListGroup as="ul">
      <ListGroup.Item active>MQTT Broker</ListGroup.Item>
      {list}
    </ListGroup>
  );
};

const HomeView = (props) => {
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <UserList users={props.users} />
        </Col>
        <Col sm={8}>
          <PublishBox messages={props.messages} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeView;
