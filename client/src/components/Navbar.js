import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Team 3</Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/story" className="mx-3">
          List Story
        </Link>
      </Nav>
    </Navbar>
  );
}
