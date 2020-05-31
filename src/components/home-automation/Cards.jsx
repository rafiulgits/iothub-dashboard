import React, { useState } from "react";
import Thermometer from "react-thermometer-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faFan } from "@fortawesome/free-solid-svg-icons";
import { ActivationStatus } from "../../models/Common";
import { Container, Row, Col, Form } from "react-bootstrap";

export const LightCard = ({ status, switchCallback }) => {
  const [lightStatus, setLightStatus] = useState(ActivationStatus.OFF);
  if (status !== lightStatus) {
    setLightStatus(status);
  }
  const handleChange = (e) => {
    if (lightStatus === ActivationStatus.OFF) {
      setLightStatus(ActivationStatus.ON);
      switchCallback({ status: ActivationStatus.ON });
    } else {
      setLightStatus(ActivationStatus.OFF);
      switchCallback({ status: ActivationStatus.OFF });
    }
  };
  const bulbColor = lightStatus === ActivationStatus.ON ? "red" : "white";
  return (
    <Container fluid className="shadow p-2 m-1 list-group-item-danger">
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
              id="light-switch"
              onChange={handleChange}
              label=""
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

// ------------------------------------------------------------------------

export const ACCard = ({ status, value, remoteCallback }) => {
  const [acStatus, setAcStatus] = useState(ActivationStatus.OFF);
  const [temperatureValue, setTemperatureValue] = useState(value);
  if (status !== acStatus) {
    setAcStatus(status);
  }
  if (value !== temperatureValue) {
    setTemperatureValue(value);
  }
  const handleSwitch = (e) => {
    if (acStatus === ActivationStatus.OFF) {
      setAcStatus(ActivationStatus.ON);
      remoteCallback({
        status: ActivationStatus.ON,
      });
    } else {
      setAcStatus(ActivationStatus.OFF);
      remoteCallback({
        status: ActivationStatus.OFF,
      });
    }
  };

  const handleValueChange = (e) => {
    let value = (Number.parseFloat(e.target.value) / 2).toFixed(0);
    setTemperatureValue(value);
    remoteCallback({
      status: acStatus,
      value: value,
    });
  };

  const acColor = acStatus === ActivationStatus.ON ? "green" : "dark";
  return (
    <Container fluid className="shadow p-2 m-1 list-group-item-primary">
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
              color={acColor}
              size="4x"
              icon={faFan}
            />
          </div>
        </Col>
        <Col sm={8} className="text-center">
          <h6 className=" mt-3">AC</h6>
          <h6>{`${acStatus} : ${value}`}</h6>
          <Form className="mt-2 mb-2">
            <Form.Check
              checked={acStatus === ActivationStatus.ON}
              type="switch"
              id="ac-switch"
              onChange={handleSwitch}
              label=""
            />
            <Form.Control
              onChange={handleValueChange}
              type="range"
              custom
              defaultValue={temperatureValue}
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
