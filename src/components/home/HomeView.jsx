import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const UserItem = ({ user, clientCloseCallback }) => {
  const onClientClose = () => {
    clientCloseCallback(user.id);
  };
  return (
    <div>
      <b>{user.name}</b>
      <div className="d-inline-block float-right">
        <Button className="mr-1" size="sm" variant="primary">
          View
        </Button>
        <Button size="sm" variant="danger" onClick={onClientClose}>
          <FontAwesomeIcon size="lg" icon={faTimesCircle} />
        </Button>
      </div>
    </div>
  );
};

const UserList = ({ users, clientCloseCallback }) => {
  let list = [];
  users.forEach((item, index) => {
    list.push(
      <ListGroup.Item align="left" as="li" key={index}>
        <UserItem user={item} clientCloseCallback={clientCloseCallback} />
      </ListGroup.Item>
    );
  });
  return (
    <ListGroup as="ul">
      <ListGroup.Item className="bg-success text-white">
        Active Clients
      </ListGroup.Item>
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
    <Container className="p-1 m-2">
      <Row>
        <Col sm={4}>
          <UserList
            users={props.users}
            clientCloseCallback={props.clientCloseCallback}
          />
        </Col>
        <Col sm={8}>
          <PublishBox messages={props.messages} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeView;
