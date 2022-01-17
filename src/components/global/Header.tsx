import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import headerItems from "../../data/headerItems.json";

export default function Header() {
  const { pathname } = useLocation();
  const isTabActive = (tabName: string, homePage: boolean): boolean => {
    if (homePage && pathname === "/") {
      return true; // Set as homepage
    }
    if (tabName === pathname.substring(1)) {
      return true;
    }
    return false;
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="grey" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">NathanJms</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {headerItems.map((element) => (
                <Nav.Link
                  key={element.id}
                  active={isTabActive(element.tabName, element.homePage)}
                  href={element.link}
                >
                {element.name}
                </Nav.Link>
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
