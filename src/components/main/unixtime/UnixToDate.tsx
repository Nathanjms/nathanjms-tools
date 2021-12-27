import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
  InputGroup,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";

interface Props {}

const UnixToDate: React.FC<Props> = () => {
  const [date, setDate] = useState<any>(new Date());
  const [unixTime, setUnixTime] = useState<number>(0);
  const [englishDate, setEnglishDate] = useState<string>("");
  const [addTime, setAddTime] = useState<boolean>(false); // True to add, false to subtract
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1);

  useEffect(() => {
    setUnixTime(Math.floor(date / 1000));
    setEnglishDate(date.toString());
  }, [date]);

  const handleCurrentTimestampChange = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setDate(new Date(Number(e.currentTarget.value) * 1000));
  };

  const addOrSubtract = (a: number, b: number): number => {
    if (addTime) {
      return a + b;
    }
    return a - b;
  };

  const handleUnixChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    var newDate;
    if (e.currentTarget.value === "year") {
      newDate = new Date(
        date.setFullYear(addOrSubtract(date.getFullYear(), quantityToAdd))
      );
      return setDate(newDate);
    }
    if (e.currentTarget.value === "month") {
      newDate = new Date(
        date.setMonth(addOrSubtract(date.getMonth(), quantityToAdd))
      );
      return setDate(newDate);
    }
    if (e.currentTarget.value === "week") {
      newDate = new Date(
        date.setDate(addOrSubtract(date.getDate(), 7 * quantityToAdd))
      );
      return setDate(newDate);
    }
    if (e.currentTarget.value === "day") {
      newDate = new Date(
        date.setDate(addOrSubtract(date.getDate(), quantityToAdd))
      );
      return setDate(newDate);
    }
    if (e.currentTarget.value === "hour") {
      newDate = new Date(
        date.setHours(addOrSubtract(date.getHours(), quantityToAdd))
      );
      return setDate(newDate);
    }
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target.value === "custom") {
      return handleCustomQuantityChange();
    }
    setQuantityToAdd(Number(e.target.value));
  };

  const handleCustomQuantityChange = (): void => {
    Swal.fire({
      title: "Enter custom amount",
      input: "number",
      inputLabel: `The amount to be ${getAddSubtractWording()}ed`,
      inputValue: "",
      showCancelButton: true,
      inputValidator: (result) => {
        if (!result || Number(result) <= 0) {
          return "Please enter a positive integer!";
        }
        return null;
      },
    }).then((result) => {
      if (result?.isConfirmed) {
        addNewOptionToQuantityDropdown(result.value);
        setQuantityToAdd(Number(result.value));
        return;
      }
    });
  };

  const addNewOptionToQuantityDropdown = (newValue: string): void => {
    let dropdown = document.getElementById(
      "changeDropdown"
    ) as HTMLSelectElement;

    let op = new Option();
    op.value = newValue;
    op.text = newValue + " (Custom)";
    dropdown.options.add(op);
  };

  const getAddSubtractWording = () => {
    return addTime ? "Add" : "Subtract";
  };

  const handleCopyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    let btn = e.currentTarget as HTMLButtonElement;
    let copyText = document.getElementById("unixTimeInput") as HTMLInputElement;

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
    <>
      <Toaster position="top-right" />
      <Row>
        <h2>Unix Timestamp</h2>
      </Row>
      <Row>
        <Col>
          <p>The Current Unix Timestamp is:</p>
          <InputGroup className="mb-3">
            <input
              id="unixTimeInput"
              type="number"
              className="form-control"
              value={String(unixTime)}
              onChange={handleCurrentTimestampChange}
            />
            <Button id="copyToClipboard" onClick={handleCopyToClipboard}>
              <FaCopy />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={6} className="my-3">
          <div className="grey-card h-100">
            <h5>Short:</h5>
            <p>{date.toLocaleString()}</p>
            <h5>Long:</h5>
            <p>{englishDate}</p>
          </div>
        </Col>
        <Col sm={6} className="my-3">
          <div className="grey-card">
            <h4>I want to...</h4>
            <Row className="mb-3">
              <Col xs={6}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setAddTime(!addTime);
                  }}
                  style={{ minWidth: "100%", wordWrap: "break-word" }}
                >
                  {getAddSubtractWording()}
                </Button>
              </Col>
              <Col xs={6}>
                <Form.Select
                  onChange={(e) => handleQuantityChange(e)}
                  size="sm"
                  aria-label="Default select example"
                  value={quantityToAdd}
                  id="changeDropdown"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="custom">Custom</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="justify-content-center add-sub-btns-container">
              <Col xs={6} lg={4}>
                <button
                  className="btn btn-primary"
                  onClick={handleUnixChange}
                  value="hour"
                >
                  Hour
                </button>
              </Col>
              <Col xs={6} lg={4}>
                <button
                  className="btn btn-primary"
                  onClick={handleUnixChange}
                  value="day"
                >
                  Day
                </button>
              </Col>
              <Col xs={6} lg={4}>
                <button
                  className="btn btn-primary"
                  onClick={handleUnixChange}
                  value="week"
                >
                  Week
                </button>
              </Col>
              <Col xs={6} lg={6}>
                <button
                  className="btn btn-primary"
                  onClick={handleUnixChange}
                  value="month"
                >
                  Month
                </button>
              </Col>
              <Col xs={12} lg={6}>
                <button
                  className="btn btn-primary"
                  onClick={handleUnixChange}
                  value="year"
                >
                  Year
                </button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UnixToDate;
