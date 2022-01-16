import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const isTabActive = (tabName: string): boolean => {
    if (tabName === pathname.substring(1)) {
      return true;
    }
    if (tabName === "unix-timestamp" && pathname === "/") {
      return true;
    }
    return false;
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="grey" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Nathan James</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link active={isTabActive("unix-timestamp")} href="/">
              Unix Timestamp
            </Nav.Link>
            <Nav.Link
              active={isTabActive("character-count")}
              href="character-count"
            >
              Character Count
            </Nav.Link>
            <Nav.Item className="text-muted">Map [WIP]</Nav.Item>
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
