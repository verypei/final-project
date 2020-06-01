import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap"

export default function NavBar() {
  return (
    <Navbar className="navbar">
      {
        localStorage.getItem('username')?
        (
          <Nav className="mr-auto">
            <Link to="/">
              <p className="navbarLink">login</p>
            </Link>
          </Nav>
        ) : 
        (
          <Nav className="mr-auto">
            <Link to="/">
              <p className="navbarLink">login</p>
            </Link>
          </Nav>
        )
      }
      <Nav className="mr-auto">
        <Link to="/story" className="mx-3">
          <p className="navbarLink">stories</p>
        </Link>
      </Nav>

    </Navbar>
  );
}
