import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Climate from "./Climate";
import { HomeLight } from "./Accessories";
import TemperatureChart from "./TemperatureChart";

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
    <ListGroup as="ul" className="shadow">
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
    <ListGroup as="ul" className="shadow">
      <ListGroup.Item active>MQTT Broker Logs</ListGroup.Item>
      {list}
    </ListGroup>
  );
};

const HomeView = (props) => {
  return (
    <Container fluid className="p-1">
      <Row className="d-flex justify-content-center m-0 p-0">
        <Col sm={4}>
          <Climate temperature={props.temperature} humidity={props.humidity} />
        </Col>
        <Col sm={4}>
          <HomeLight />
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
};

export default HomeView;
