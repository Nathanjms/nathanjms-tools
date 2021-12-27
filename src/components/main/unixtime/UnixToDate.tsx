import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

interface Props {}

const UnixToDate: React.FC<Props> = () => {
  const [date, setDate] = useState<any>(new Date());
  const [unixTime, setUnixTime] = useState<number>(0);
  const [englishDate, setEnglishDate] = useState<string>("");
  const [addTime, setAddTime] = useState<boolean>(false); // True to add, false to subtract

  useEffect(() => {
    setUnixTime(Math.floor(date / 1000));
  }, []);

  useEffect(() => {
    setEnglishDate(date.toString());
    setUnixTime(Math.floor(date / 1000));
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
        date.setFullYear(addOrSubtract(date.getFullYear(), 1))
      );
      return setDate(newDate);
    }
    if (e.currentTarget.value === "month") {
      newDate = new Date(date.setMonth(addOrSubtract(date.getMonth(), 1)));
      return setDate(newDate);
    }
    if (e.currentTarget.value === "week") {
      newDate = new Date(date.setDate(addOrSubtract(date.getDate(), 7)));
      return setDate(newDate);
    }
    if (e.currentTarget.value === "day") {
      newDate = new Date(date.setDate(addOrSubtract(date.getDate(), 1)));
      return setDate(newDate);
    }
    if (e.currentTarget.value === "hour") {
      newDate = new Date(date.setHours(addOrSubtract(date.getHours(), 1)));
      return setDate(newDate);
    }
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
        <Col>
          <p>English date:</p>
          <p>{englishDate}</p>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <h4>
            I want to{" "}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setAddTime(!addTime);
              }}
            >
              {getAddSubtractWording()}...
            </button>{" "}
            a:
          </h4>
          <div className="add-sub-btns-container">
            <button
              className="btn btn-primary"
              onClick={handleUnixChange}
              value="hour"
            >
              Hour
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUnixChange}
              value="day"
            >
              Day
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUnixChange}
              value="week"
            >
              Week
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUnixChange}
              value="month"
            >
              Month
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUnixChange}
              value="year"
            >
              Year
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UnixToDate;
