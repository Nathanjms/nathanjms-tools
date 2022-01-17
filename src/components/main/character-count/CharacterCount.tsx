import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface Props {}

const CharacterCount: React.FC<Props> = (): ReactElement => {
  const [charCount, setCharCount] = React.useState<number>(0);
  const [wordCount, setWordCount] = React.useState<number>(0);
  const [lineCount, setLineCount] = React.useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    let inputText = e.currentTarget.value;
    setCharCount(inputText.length);
    setWordCount(inputText.split(/\s\S/).length);
    setLineCount(inputText.split("\n").length);
  };

  return (
    <Container id="character-count" className="section text-start">
      <Row>
        <h2>Character Counter</h2>
      </Row>
      <Row>
        <Col sm={8} className="my-2">
          <div className="grey-card h-100">
            <p>Enter text into the input box below for it to be counted.</p>
            <textarea
              rows={5}
              className="w-100 rounded"
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col sm={4} className="my-2">
          <div className="grey-card h-100">
            <h5>Character Count: {charCount}</h5>
            <h5>Word Count: {wordCount}</h5>
            <h5>Line Count: {lineCount}</h5>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CharacterCount;
