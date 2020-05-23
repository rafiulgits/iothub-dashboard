import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Thermometer from "react-thermometer-component";

const Item = ({ label, value }) => {
  return (
    <div>
      <h6 className="text-center">{value}</h6>
      <small className="text-center">
        <b>{label}</b>
      </small>
    </div>
  );
};

const Climate = ({ temperature, humidity }) => {
  return (
    <Container fluid className="shadow p-2 m-1 bg-warning text-white">
      <Row>
        <Col sm={5} className="d-flex justify-content-center">
          <Thermometer
            theme="dark"
            value={temperature}
            max={100}
            format="°C"
            size="small"
            height="120"
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

export default Climate;
