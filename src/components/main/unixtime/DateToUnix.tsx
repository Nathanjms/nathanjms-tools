import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SwalErrorNaNMessage } from "./UnixTime";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const DateToUnix: React.FC<Props> = ({ date, setDate }) => {
  const [inputValues, setInputValues] = useState<{ [x: string]: string }>({
    date: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    second: "",
  });

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

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleUpdateUnixSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var newDate: Date | null = null;

    newDate = set(date, {
      date: Number(inputValues.date),
      month: Number(inputValues.month) - 1,
      year: Number(inputValues.year),
      hours: Number(inputValues.hours),
      minutes: Number(inputValues.minutes),
      seconds: Number(inputValues.seconds),
    });

    if (isNaN(newDate.getTime())) {
      // Handle Invalid Date.
      SwalErrorNaNMessage("Error with the input date! Reloading...");
      return;
    }

    if (newDate) setDate(newDate); // Set new date if date is valid.
  };

  return (
    <Form id="dateToUnixForm" onSubmit={handleUpdateUnixSubmit}>
      <Row>
        <Col xs={6} lg={4}>
          <label className="form-label">Day</label>
          <input
            name="date"
            className="form-control"
            type="number"
            min="1"
            max="31"
            required={true}
            maxLength={2}
            placeholder="DD"
            value={inputValues?.date || ""}
            onChange={handleOnChange}
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
            required={true}
            maxLength={2}
            placeholder="MM"
            value={inputValues?.month || ""}
            onChange={handleOnChange}
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
            min="-9999"
            max="9999"
            required={true}
            value={inputValues?.year || ""}
            onChange={handleOnChange}
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
            required={true}
            maxLength={2}
            placeholder="HH"
            value={inputValues?.hours || ""}
            onChange={handleOnChange}
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
            required={true}
            maxLength={2}
            placeholder="MM"
            value={inputValues?.minutes || ""}
            onChange={handleOnChange}
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
            required={true}
            maxLength={2}
            placeholder="SS"
            value={inputValues?.seconds || ""}
            onChange={handleOnChange}
          />
        </Col>
        <Col xs={12}>
          <Button
            className="w-100 mt-3"
            as="input"
            type="submit"
            value="Convert"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default DateToUnix;
