import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import image from '../assets/31052020063111A.png'

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand style={{width: '5%', height:'5%'}}>
        <Link to="/home"><img src={image} width='100%'/></Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/story" className="mx-3" style={{color: '#649D66'}}>
          List Story
        </Link>
      </Nav>
    </Navbar>
  );
}
