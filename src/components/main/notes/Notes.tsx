import React, { ReactElement, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../../../css/Notes.css";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import docsConfig from "../../../data/docsConfig.json";

interface Props {}

const Notes: React.FC<Props> = (): ReactElement => {
  const [fileName, setFileName] = useState<string>("");
  const [document, setDocument] = useState<string>("");
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

  const handleClick = (fileName: string) => setFileName(fileName);

  return (
    <Container id="notes" className="section text-start">
      <Row>
        <h2>Notes</h2>
        <p>
          Below contains some documentation that I've made, which is probably
          only useful to me... but feel free to take a look!
        </p>
      </Row>
      <Row>
        <Col sm={3}>
          <div className="note">
            <h4>Documents</h4>
            <p>Select a document from the list below...</p>
            <ListGroup>
              {docsConfig.map((docConfig, index) => {
                return (
                  <ListGroupItem
                    action
                    as="button"
                    key={docConfig.id}
                    onClick={() => handleClick(docConfig.fileName)}
                    active={fileName === docConfig.fileName}
                  >
                    {docConfig.name}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
        </Col>
        <Col sm={9}>
          <div className="note">
            <ReactMarkdown children={document} />
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
