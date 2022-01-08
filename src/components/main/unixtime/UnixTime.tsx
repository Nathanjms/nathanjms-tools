import { add, sub } from "date-fns";
import React, { ReactElement, useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  Container,
  Alert,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import Swal, { SweetAlertResult } from "sweetalert2";
import DateToUnix from "./DateToUnix";

interface UnixTimeProps {}

const UnixTime: React.FC<UnixTimeProps> = (): ReactElement => {
  const [date, setDate] = useState<Date>(new Date());
  const [unixTime, setUnixTime] = useState<number>(0);
  const [addTime, setAddTime] = useState<boolean>(false); // True to add, false to subtract
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1);
  const [hasExceeded32BitLimit, setHasExceeded32BitLimit] = useState<boolean>(false);

  useEffect((): void => {
    setUnixTime(Math.floor(Number(date) / 1000));
  }, [date]);

  useEffect((): void => {
    setHasExceeded32BitLimit(unixTime > 2147483647);
  }, [unixTime]);

  const handleCurrentTimestampChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setDate(new Date(Number(e.currentTarget.value) * 1000));
  };

  const handleUnixChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
    var newDate: Date | null = null;

    newDate = addTime
      ? add(date, { [`${e.currentTarget.value}s`]: quantityToAdd })
      : sub(date, { [`${e.currentTarget.value}s`]: quantityToAdd });

    if (isNaN(newDate.getTime())) {
      SwalErrorNaNMessage();
    }
    if (newDate) setDate(newDate); // Set new date if not null.
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
      inputValidator: (result: string): string | null => {
        if (!result || Number(result) <= 0 || Number(result) > 100) {
          return "Please enter an integer between 1 and 100";
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

  const getAddSubtractWording = (): string => {
    return addTime ? "Add" : "Subtract";
  };

  const handleCopyToClipboard = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
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
    <React.Fragment>
      <Toaster position="top-right" />
      <Container id="unix-timestamp" className="section text-start">
        <Row>
          <h2>Unix Timestamp</h2>
        </Row>
        <Row>
          <Col xs={12}>
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
          {hasExceeded32BitLimit && (
            <Col>
              <Alert variant="warning">
                Warning: Date has exceeded 32 Bit memory limit.
              </Alert>
            </Col>
          )}
        </Row>
        <Row className="mt-2">
          <Col sm={6} className="my-3">
            <div className="grey-card h-100">
              <h5>UK Date:</h5>
              <p>{date.toLocaleString("en-GB")}</p>
              <h5>Long Date:</h5>
              <p>{date.toString()}</p>
              <DateToUnix date={date} setDate={setDate} />
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
                    value="minute"
                  >
                    Minute
                  </button>
                </Col>
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
                <Col xs={6} lg={4}>
                  <button
                    className="btn btn-primary"
                    onClick={handleUnixChange}
                    value="month"
                  >
                    Month
                  </button>
                </Col>
                <Col xs={6} lg={4}>
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
      </Container>
    </React.Fragment>
  );
};

export const SwalErrorNaNMessage = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Exceeded maximum Date range! Reloading page...",
    confirmButtonText: "Reload Now",
    timer: 2000,
    timerProgressBar: true,
  }).then((result: SweetAlertResult): void => {
    window.location.reload();
  });
};

export default UnixTime;
