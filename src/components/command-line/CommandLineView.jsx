import React, { useState } from "react";
import { Form, Col, Button, Container, Row, ListGroup } from "react-bootstrap";

const Item = ({ topic, payload }) => {
  return (
    <div>
      <p>
        <small>
          <b>{"Topic: "}</b>
          {topic}
        </small>
      </p>
      <pre>
        <code>{payload}</code>
      </pre>
    </div>
  );
};

const IncommingMessageBox = ({ messages }) => {
  let list = [];
  messages.forEach((msg, index) => {
    list.push(
      <ListGroup.Item key={index}>
        <Item topic={msg.topic} payload={msg.payload} />
      </ListGroup.Item>
    );
  });
  return (
    <div className="shadow">
      <ListGroup>
        <ListGroup.Item active>Incomming Messages</ListGroup.Item>
      </ListGroup>

      <div style={{ maxHeight: "80vh", overflowY: "scroll" }}>
        <ListGroup>{list}</ListGroup>
      </div>
    </div>
  );
};

const InvokeForm = ({ onInvokeRequest }) => {
  const [payload, setPayload] = useState();
  const [topic, setTopic] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { topic: topic, payload: payload };
    onInvokeRequest(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Control
        className="shadow"
        as="textarea"
        placeholder="Payload"
        onChange={(e) => {
          setPayload(e.target.value);
        }}
      />
      <Form.Row>
        <Col sm={8}>
          <Form.Control
            required
            className="shadow"
            placeholder="Topic"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
        </Col>
        <Col sm={4}>
          <Button variant="success" type="submit" className="btn-block shadow">
            Invoke
          </Button>
        </Col>
      </Form.Row>
    </form>
  );
};

const CommandLineView = ({ messages, onInvokeRequest }) => {
  return (
    <Container fluid className="mt-2">
      <Row>
        <Col sm={7}>
          <IncommingMessageBox messages={messages} />
        </Col>
        <Col sm={5}>
          <InvokeForm onInvokeRequest={onInvokeRequest} />
        </Col>
      </Row>
    </Container>
  );
};

export default CommandLineView;
