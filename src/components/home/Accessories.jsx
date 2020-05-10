import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form } from "react-bootstrap";

const HomeLight = (props) => {
  const [lightStatus, setLightStatus] = useState("OFF");
  const handleChange = (e) => {
    if (lightStatus === "ON") {
      setLightStatus("OFF");
    } else {
      setLightStatus("ON");
    }
  };
  const bulbColor = lightStatus === "ON" ? "green" : "dark";
  return (
    <Container fluid className="shadow p-2 m-1">
      <Row>
        <Col sm={6}>
          <div
            className=""
            style={{
              height: "100%",
            }}
          >
            <FontAwesomeIcon
              className="text-center mt-4"
              color={bulbColor}
              size="4x"
              icon={faLightbulb}
            />
          </div>
        </Col>
        <Col sm={6}>
          <h6 className="text-center mt-3">Home Light</h6>
          <h3>{lightStatus}</h3>
          <Form className="mt-2 mb-2">
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={handleChange}
              label=""
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export { HomeLight };
