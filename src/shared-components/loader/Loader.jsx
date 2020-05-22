import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const Loader = ({ show }) => {
  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="d-flex justify-content-center">
        <Spinner animation="border" />
      </Modal.Body>
    </Modal>
  );
};

export default Loader;
