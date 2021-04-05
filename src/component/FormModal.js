// import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function FormModal({
  visible,
  title,
  closeModal,
  handleSave,
  name,
  dob,
  email,
  phone,
  setName,
  setDob,
  setEmail,
  setPhone,
}) {
  return (
    <Modal show={visible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="text"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={name === undefined || dob === undefined}
          onClick={() => handleSave({ name, dob, email, phone })}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
