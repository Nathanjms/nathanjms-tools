import React, { ReactElement, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface Props {}

const ColumnToCsv: React.FC<Props> = (): ReactElement => {
  const [convertedColData, setConvertedColData] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    let inputText = e.currentTarget.value;
    setConvertedColData(inputText.replaceAll("\n", ","));
  };

  return (
    <Container id="column-to-csv" className="section text-start">
      <Row>
        <h2>Column To Csv</h2>
      </Row>
      <Row>
        <Col sm={6} className="my-2">
          <div className="grey-card h-100">
            <p>Enter your column data into the box below.</p>
            <textarea
              rows={5}
              className="w-100 rounded"
              onChange={handleChange}
            />
          </div>
        </Col>
        <Col sm={6} className="my-2">
          <div className="grey-card h-100">
          <p>Copy your csv data.</p>
            <textarea
              rows={5}
              className="w-100 rounded"
              value={convertedColData}
              readOnly={true}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ColumnToCsv;
