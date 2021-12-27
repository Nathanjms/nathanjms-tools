import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";

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

  const addOrSubtract = (a: number, b: number) => {
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

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "custom") {
      return handleCustomYearChange();
    }
    setQuantityToAdd(Number(e.target.value));
  };

  const handleCustomYearChange = () => {
    // TODO:
    // 1. Sweet alert form
    // 2. On submit:
    //    a. Change `quantityToAdd` variable
    //    b. reset dropdown with new value as selected (so switch of custom).
  };

  const getAddSubtractWording = () => {
    return addTime ? "Add" : "Subtract";
  };

  return (
    <>
      <Row>
        <h2>Unix Timestamp</h2>
      </Row>
      <Row>
        <Col>
          <p>The Current Unix Timestamp is:</p>
          <input
            type="number"
            className="form-control"
            value={String(unixTime)}
            onChange={handleCurrentTimestampChange}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm={6} className="my-3">
          <div className="grey-card h-100">
            <p>English date:</p>
            <p>{englishDate}</p>
          </div>
        </Col>
        <Col sm={6} className="my-3">
          <div className="grey-card">
            <h4>
              I want to{" "}
              <OverlayTrigger
                overlay={<Tooltip>Toggle Adding/Subtracting.</Tooltip>}
              >
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setAddTime(!addTime);
                  }}
                >
                  {getAddSubtractWording()}...
                </Button>
              </OverlayTrigger>{" "}
              <span style={{ display: "inline-block" }}>
                <Form.Select
                  onChange={(e) => handleYearChange(e)}
                  size="sm"
                  aria-label="Default select example"
                  defaultValue={1}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="custom">Custom</option>
                </Form.Select>
              </span>
            </h4>
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
