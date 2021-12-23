import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="grey" variant='dark' sticky="top">
      <Container>
        <Navbar.Brand href="/">Nathan James</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#unix-timestamp">Unix TimeStamp</Nav.Link>
            <Nav.Item className="text-muted">Map [WIP]</Nav.Item>
          </Nav>
          <Nav>
            <Nav.Link href="https://nathanjms.co.uk">Go to <em>nathanjms.co.uk</em></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
