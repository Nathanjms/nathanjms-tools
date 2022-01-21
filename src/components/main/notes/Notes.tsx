import React, { Component, ReactElement, useEffect, useState } from "react";
import FnKeys from "../../../data/fnkeys.md";
// import UsefulPrograms from "../../../data/usefulPrograms.md";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../../../css/Notes.css";
import { Col, Container, Row } from "react-bootstrap";

interface Props {}

const Notes: React.FC<Props> = (): ReactElement => {
  const [fnKeys, setFnKeys] = useState<string>("");
  useEffect(() => {
    import(`../../../data/docs/${fileName}.md`)
      .then((markDown) => {
        fetch(markDown.default)
          .then((res) => res.text())
          .then((text) => {
            setDocument(text);
          });
      })
      .catch((error) => {
        setDocument("*Select a document for it's content to appear here.*");
      });
  }, [fileName]);
    //   .then((res) => res.text())
    //   .then((text) => this.setState({ UsefulPrograms: text }));
  }, []);
  return (
    <Container id="notes" className="section text-start">
      <Row>
        <h2>Notes</h2>
      </Row>
      <Row>
        <Col sm={3}>
        <div className="note">
            <h3>Notes</h3>
          </div>
        </Col>
        <Col sm={9}>
          <div className="note">
            <ReactMarkdown children={fnKeys} />
          </div>
          {/* <div className="note">
                <ReactMarkdown children={UsefulPrograms} />
              </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Notes;
