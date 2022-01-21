import React, { ReactElement, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../../../css/Notes.css";
import { Col, Container, Row } from "react-bootstrap";
import NotesList from "./NotesList";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
            <NotesList setFileName={setFileName} fileName={fileName} />
          </div>
        </Col>
        <Col sm={9}>
          <div className="note">
            <ReactMarkdown
              children={document}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      style={atomDark}
                      language={match[1]}
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Notes;
