import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar className="navbar">
      <Navbar.Brand>
        <img className="imageNavbar" alt=""></img>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/" className="mx-2">
          Home
        </Link>
      </Nav>
      <Nav className="mr-auto">
        <Link to="/story" className="mx-3">
          Stories
        </Link>
      </Nav>
    </Navbar>
  );
}
