import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { SwalErrorNaNMessage } from "./UnixTime";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const DateToUnix: React.FC<Props> = ({ date, setDate }) => {
  const [inputValues, setInputValues] = useState<{ [x: string]: string }>();

  useEffect(() => {
    setInputValues({
      year: date.getFullYear().toString().padStart(4, "0"),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
      date: date.getDate().toString().padStart(2, "0"),
      hours: date.getHours().toString().padStart(2, "0"),
      minutes: date.getMinutes().toString().padStart(2, "0"),
      seconds: date.getSeconds().toString().padStart(2, "0"),
    });
  }, [date]);

  // Don't set the input values; make it set the date, and then the date will set the input values using the useEffect above.
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;
    if (!value) return; // Ignore if value is invalid (ie. something that wasn't a number was input)

    var newDate: Date | null = null;
    if (name === "month") {
      value = (Number(value) - 1).toString().padStart(2, "0"); // Account for month's 0 indexing
    }
    newDate = set(date, { [`${name}`]: value });
    if (isNaN(newDate.getTime())) {
      // Handle Invalid Date.
      SwalErrorNaNMessage();
    }
    if (newDate) setDate(newDate); // Set new date if not null.
  };

  return (
    <Row>
      <Col xs={6} lg={4}>
        <label className="form-label">Day</label>
        <input
          name="date"
          className="form-control"
          type="number"
          min="1"
          max="31"
          maxLength={2}
          placeholder="DD"
          value={inputValues?.date || ""}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={6} lg={4}>
        <label className="form-label">Month</label>
        <input
          name="month"
          className="form-control"
          type="number"
          min="1"
          max="12"
          maxLength={2}
          placeholder="MM"
          value={inputValues?.month || ""}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={6} lg={4}>
        <label className="form-label">Year</label>
        <input
          name="year"
          className="form-control"
          type="number"
          maxLength={4}
          placeholder="YYYY"
          value={inputValues?.year || ""}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={6} lg={4}>
        <label className="form-label">Hour</label>
        <input
          name="hours"
          className="form-control"
          type="number"
          min="0"
          max="23"
          maxLength={2}
          placeholder="HH"
          value={inputValues?.hours || ""}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={6} lg={4}>
        <label className="form-label">Minutes</label>
        <input
          name="minutes"
          className="form-control"
          type="number"
          min="0"
          max="59"
          maxLength={2}
          placeholder="MM"
          value={inputValues?.minutes || ""}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={6} lg={4}>
        <label className="form-label">Seconds</label>
        <input
          name="seconds"
          className="form-control"
          type="number"
          min="0"
          max="59"
          maxLength={2}
          placeholder="SS"
          value={inputValues?.seconds || ""}
          onChange={handleInputChange}
        />
      </Col>
    </Row>
  );
};

export default DateToUnix;
