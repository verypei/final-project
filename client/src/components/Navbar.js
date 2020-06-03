import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Modal, ListGroup } from "react-bootstrap";

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>stOURy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/story">
              Stories
            </Nav.Link>
            <Nav.Link onClick={handleShow}>How To stOURy</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How To stOURy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>1. Input your name</ListGroup.Item>
            <ListGroup.Item>
              2. Create your own room or join in the available room
            </ListGroup.Item>
            <ListGroup.Item>
              3. stOURy will start when 2 or more player in the room
            </ListGroup.Item>
            <ListGroup.Item>
              4. Each player given 30 second to write or tell the stOURy
            </ListGroup.Item>
            <ListGroup.Item>5. Each player has it' s own turn</ListGroup.Item>
            <ListGroup.Item>
              6. When time is up (5 minutes) you will be redirect to the list
              stOURy and you can read the stOURy
            </ListGroup.Item>
            <ListGroup.Item>
              7. Click read more and you can read/listen the stOURy or download
              the stOURy
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
