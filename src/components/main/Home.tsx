import React from "react";
import { Container } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Home() {
  return (
    <Container>
      <div className="intro-section">
        <div>
          <h1>Nathan James</h1>
          <p>nathan@nathanjms.co.uk</p>
          <div style={{ paddingTop: "10px" }}>
            <a className="button-logos" href="https://github.com/Nathanjms/">
              <FaGithub />
            </a>
            <a
              className="button-logos"
              href="https://www.linkedin.com/in/nathan-jms/"
            >
              <FaLinkedin id="linkedin" color="#0077B5" />
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
