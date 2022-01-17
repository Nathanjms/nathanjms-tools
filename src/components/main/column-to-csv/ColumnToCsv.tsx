import React, { ReactElement, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

interface Props {}

const ColumnToCsv: React.FC<Props> = (): ReactElement => {
  const [convertedColData, setConvertedColData] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    let inputText = e.currentTarget.value;
    setConvertedColData(inputText.replaceAll("\n", ","));
  };

  const handleCopyToClipboard = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    let btn = e.currentTarget as HTMLButtonElement;
    let inputId = btn?.dataset?.inputId;
    
    if (!inputId) {
      toast.error("Error has occurred!", {
        style: {
          background: "#363636",
          color: "#fff",
        },
      });
      return;
    }

    let copyText = document.getElementById(inputId) as HTMLInputElement;

    btn.disabled = true;
    navigator.clipboard.writeText(copyText.value);

    toast.success("Copied!", {
      style: {
        background: "#363636",
        color: "#fff",
      },
    });

    setTimeout(() => {
      btn.disabled = false;
    }, 3000);
  };

  return (
    <Container id="column-to-csv" className="section text-start">
      <Toaster position="top-right" />
      <Row>
        <h2>Column To Csv</h2>
      </Row>
      <Row>
        <Col sm={6} className="my-2">
          <div className="grey-card h-100">
            <p>Enter your column data into the box below...</p>
            <textarea
              rows={5}
              className="w-100 rounded"
              onChange={handleChange}
              id="input-text"
            />
          <Button data-input-id="input-text" id="columnCopyBtn" className="mt-2 w-100" onClick={handleCopyToClipboard}>
            <FaCopy /> Copy to Clipboard
          </Button>
          </div>
        </Col>
        <Col sm={6} className="my-2">
          <div className="grey-card h-100">
            <p>...and it will appear here separated by commas.</p>
            <textarea
              rows={5}
              className="w-100 rounded"
              value={convertedColData}
              readOnly={true}
              id="convertedColData"
            />
          <Button data-input-id="convertedColData" id="commaCopyBtn" className="mt-2 w-100" onClick={handleCopyToClipboard}>
            <FaCopy /> Copy to Clipboard
          </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ColumnToCsv;
