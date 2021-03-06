import React, { ReactElement, useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  Container,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import Swal, { SweetAlertResult } from "sweetalert2";
import AddSubBtnsForm from "./AddSubBtnsForm";
import DateToUnix from "./DateToUnix";
import { set } from "date-fns";

interface UnixTimeProps {}

const UnixTime: React.FC<UnixTimeProps> = (): ReactElement => {
  const [date, setDate] = useState<Date>(new Date());
  const [sqlDate, setSqlDate] = useState<string>("");
  const [unixTime, setUnixTime] = useState<number>(0);
  const [timeOperator, setTimeOperator] = useState<"add" | "subtract">(
    "subtract"
  );
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1);
  const [hasExceeded32BitLimit, setHasExceeded32BitLimit] =
    useState<boolean>(false);

  useEffect((): void => {
    setUnixTime(Math.floor(Number(date) / 1000));
    setSqlDate(formatToSqlDate(date));
  }, [date]);

  useEffect((): void => {
    setHasExceeded32BitLimit(unixTime > 2147483647);
  }, [unixTime]);

  const handleCurrentTimestampChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setDate(new Date(Number(e.currentTarget.value) * 1000));
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
    return timeOperator.charAt(0).toUpperCase() + timeOperator.slice(1);
  };

  const handleCopyToClipboard = (
    e: React.MouseEvent<HTMLButtonElement>,
    copyVal: string
  ): void => {
    let btn = e.currentTarget;
    btn.disabled = true;
    navigator.clipboard.writeText(copyVal);

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

  const formatToSqlDate = (date: Date) => {
    return (
      date.getFullYear().toString().padStart(4, "0") +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0")
    );
  };

  const handleSqlDateChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tempSqlDate = sqlDate.trim().slice(0, 19); // Allow (but ignore) timezone input (postgreSQL) with the slice method.
    if (!validSqlDate.test(tempSqlDate)) {
      toast.error("Invalid SQL date format detected!", {
        style: {
          background: "#363636",
          color: "#fff",
        },
      });
      return;
    }

    var newDate: Date | null = null;
    newDate = set(date, {
      year: Number(tempSqlDate.slice(0, 4)),
      month: Number(tempSqlDate.slice(5, 7)) - 1,
      date: Number(tempSqlDate.slice(8, 10)),
      hours: Number(tempSqlDate.slice(11, 13)),
      minutes: Number(tempSqlDate.slice(14, 16)),
      seconds: Number(tempSqlDate.slice(17, 19)),
    });

    if (isNaN(newDate.getTime())) {
      // Handle Invalid Date.
      SwalErrorNaNMessage("Error when converting the input date! Reloading...");
      return;
    }

    if (newDate) setDate(newDate); // Set new date if date is valid.
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
            <InputGroup className="mb-3">
              <input
                id="unixTimeInput"
                type="number"
                className="form-control"
                value={String(unixTime)}
                onChange={handleCurrentTimestampChange}
              />
              <Button
                id="copyToClipboard"
                onClick={(e) => handleCopyToClipboard(e, String(unixTime))}
              >
                <FaCopy />
              </Button>
            </InputGroup>
          </Col>
          {hasExceeded32BitLimit && (
            <Col xs={12}>
              <Alert variant="info">
                Note: Date has exceeded 32 Bit memory limit.
              </Alert>
            </Col>
          )}
          <Col sm={6} className="my-2">
            <div className="grey-card">
              <h5>UK Date:</h5>
              <p>{date.toLocaleString("en-GB")}</p>
              <h5>Long Date:</h5>
              <p>{date.toString()}</p>
            </div>
          </Col>
          <Col sm={6} className="my-2">
            <div className="grey-card h-100">
              <h4>I want to...</h4>
              <Row className="mb-3">
                <Col xs={8}>
                  <ToggleButtonGroup
                    className="w-100"
                    size="sm"
                    name="orderBy"
                    onChange={(value) => setTimeOperator(value)}
                    defaultValue={timeOperator}
                  >
                    <ToggleButton
                      id="radioBtnAsc"
                      value="add"
                      disabled={timeOperator === "add"}
                    >
                      Add
                    </ToggleButton>
                    <ToggleButton
                      id="radioBtnDesc"
                      value="subtract"
                      disabled={timeOperator === "subtract"}
                    >
                      Subtract
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Col>
                <Col xs={4}>
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
                <AddSubBtnsForm
                  addTime={timeOperator === "add"}
                  date={date}
                  setDate={setDate}
                  quantityToAdd={quantityToAdd}
                />
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={6} className="my-2">
            <div className="grey-card h-100">
              <h4>SQL Timestamp to Unix</h4>
              <p>Input date of the form YYYY-MM-DD HH:MM:SS</p>
              <Form className="mb-3" onSubmit={handleSqlDateChange}>
                <InputGroup className="mb-3">
                  <input
                    id="sqlTimeInput"
                    type="text"
                    className="form-control"
                    value={sqlDate}
                    onChange={(e) => {
                      setSqlDate(e.target.value);
                    }}
                  />
                  <Button onClick={(e) => handleCopyToClipboard(e, sqlDate)}>
                    <FaCopy />
                  </Button>
                </InputGroup>
                <Button className="w-100 mt-3" type="submit">
                  Convert
                </Button>
              </Form>
            </div>
          </Col>
          <Col sm={6} className="my-2">
            <div className="grey-card h-100">
              <h4>Date to Unix</h4>
              <DateToUnix date={date} setDate={setDate} />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export const SwalErrorNaNMessage = (errMessage: string = "Error"): void => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: errMessage,
    confirmButtonText: "Reload Now",
    timer: 2000,
    timerProgressBar: true,
  }).then((result: SweetAlertResult): void => {
    window.location.reload();
  });
};

const validSqlDate =
  /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;

export default UnixTime;
