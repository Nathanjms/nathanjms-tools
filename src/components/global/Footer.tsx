import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaGithub, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div id="footer">
      <Container className="text-start">
        <Row>
          <Col md={6}>
            <h4 style={{ paddingBottom: "20px" }}>Contact</h4>
            <div className="contact">
              <ul className="footerList list-unstyled">
                <li>Nathan James</li>
                <li style={{ paddingBottom: "5px" }}>nathan@nathanjms.co.uk</li>
                <li>
                  <a
                    className="footerLogos"
                    href="https://github.com/Nathanjms/"
                  >
                    <FaGithub />
                  </a>
                  <a
                    className="footerLogos"
                    href="https://www.youtube.com/channel/UCWL6DjV5c8oMBhOSzpvilmw"
                  >
                    <FaYoutube />
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6}>
            <h4 style={{ paddingBottom: "20px" }}>More</h4>
            <div className="contact">
              <ul className="footerList list-unstyled">
                <li>
                  <a href="https://www.nathanjms.co.uk">Go To Main Site</a>
                </li>
                <li>
                  <a href="https://movies.nathanjms.co.uk">Movies</a>
                </li>
                <li>Last updated: 3rd April 2022</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
