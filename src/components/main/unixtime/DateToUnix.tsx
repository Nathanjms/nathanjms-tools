import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

interface Props {}

const DateToUnix: React.FC<Props> = () => {
  const [inputValues, setInputValues] = useState<{ [x: string]: string }>();
  const [date, setDate] = useState<any>(0);


  useEffect(() => {
    if (!inputValues) return;

    setDate(
      new Date(
        Number(inputValues.year),
        Number(inputValues.month) - 1,
        Number(inputValues.day),
        Number(inputValues.hour),
        Number(inputValues.minute),
        Number(inputValues.second)
      )
    );
  }, [inputValues]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <h2>Date to Unix</h2>
      </Col>
      <Col md={2}>
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
      <Col md={2}>
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
      <Col md={2}>
        <label className="form-label">Day</label>
        <input
          name="day"
          className="form-control"
          type="number"
          min="1"
          max="31"
          maxLength={2}
          placeholder="DD"
          value={inputValues?.day || ""}
          onChange={handleInputChange}
        />
      </Col>
      <Col md={2}>
        <label className="form-label">Hour</label>
        <input
          name="hour"
          className="form-control"
          type="number"
          min="0"
          max="23"
          maxLength={2}
          placeholder="HH"
          value={inputValues?.hour || ""}
          onChange={handleInputChange}
        />
      </Col>
      <Col md={2}>
        <label className="form-label">Minutes</label>
        <input
          name="minutes"
          className="form-control"
          type="number"
          min="0"
          max="59"
          maxLength={2}
          placeholder="MM"
          value={inputValues?.minute || ""}
          onChange={handleInputChange}
        />
      </Col>
      <Col md={2}>
        <label className="form-label">Seconds</label>
        <input
          name="seconds"
          className="form-control"
          type="number"
          min="0"
          max="59"
          maxLength={2}
          placeholder="SS"
          value={inputValues?.second || ""}
          onChange={handleInputChange}
        />
      </Col>
    </Row>
  );
};

export default DateToUnix;
