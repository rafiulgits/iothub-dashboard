import React, { useState } from "react";
import Thermometer from "react-thermometer-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { ActivationStatus } from "../../models/Common";
import { Container, Row, Col, Form } from "react-bootstrap";

export const LightCard = ({ status }) => {
  const [lightStatus, setLightStatus] = useState(ActivationStatus.OFF);
  if (status !== lightStatus) {
    setLightStatus(status);
  }
  const handleChange = (e) => {
    if (lightStatus === ActivationStatus.OFF) {
      setLightStatus(ActivationStatus.ON);
    } else {
      setLightStatus(ActivationStatus.OFF);
    }
  };
  const bulbColor = lightStatus === ActivationStatus.ON ? "green" : "dark";
  return (
    <Container fluid className="shadow p-2 m-1">
      <Row>
        <Col sm={4}>
          <div
            className="d-flex justify-content-center"
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
        <Col sm={8} className="text-center">
          <h6 className=" mt-3">Light</h6>
          <h6>{lightStatus}</h6>
          <Form className="mt-2 mb-2">
            <Form.Check
              checked={lightStatus === ActivationStatus.ON}
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

// ------------------------------------------------------------

const Item = ({ label, value }) => {
  return (
    <div className="text-center">
      <h6>{value}</h6>
      <small>
        <b>{label}</b>
      </small>
    </div>
  );
};

export const TemperatureHumidityCard = ({ temperature, humidity }) => {
  return (
    <Container fluid className="shadow p-2 m-1 bg-warning text-white">
      <Row>
        <Col sm={5} className="d-flex justify-content-center">
          <Thermometer
            theme="dark"
            value={temperature}
            max={60}
            format="°C"
            size="small"
            height="100"
          />
        </Col>
        <Col sm={7}>
          <div className="d-block" style={{ height: "50%" }}>
            <Item label={"Temperature"} value={`${temperature}°C`} />
          </div>
          <div className="d-block" style={{ height: "50%" }}>
            <Item label={"Humidity"} value={`${humidity}%`} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
