import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import headerItems from "../../data/headerItems.json";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="grey" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">NathanJms</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {headerItems.map((element) => (
              <NavLink
                className="nav-link"
                to={element.link}
                key={element.id}
              >
                {element.name}
              </NavLink>
            ))}
          </Nav>
          <Nav>
            <Nav.Link href="https://nathanjms.co.uk">
              Go to <em>nathanjms.co.uk</em>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
