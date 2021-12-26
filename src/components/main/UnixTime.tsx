import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UnixToDate from "./unixtime/UnixToDate";

interface Props {}

const UnixTime: React.FC<Props> = () => {
  const [date, setDate] = useState<any>(0);
  const [unixTime, setUnixTime] = useState<number>(0);
  const [inputValues, setInputValues] = useState<{ [x: string]: string }>();
  const [changeDate, setChangeDate] = useState<boolean>(false);
  const [changeDateTime, setChangeDateTime] = useState<boolean>(true);

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    if (date === 0) return;

    // if (!changeDateTime) {
    //   return;
    // }
    console.log(date);

    setUnixTime(Math.floor(date / 1000));
    setChangeDate(false);
  }, [date]);

  useEffect(() => {
    if (!inputValues) return;

    console.log(inputValues);

    // if (!changeDate) {
    //   console.log('dont change dtae!')
    //   return;
    // }
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
    setChangeDateTime(false);
    // setUnixTime(Math.floor(date / 1000));
    // console.log(date.getFullYear().toString());
  }, [inputValues]);

  const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // const data = {
    //   name: inputValues?.name,
    //   email: inputValues?.email,
    //   phone: inputValues?.phone,
    //   income: inputValues?.name
    // }

    // try {
    //   const response = await fetch('https://xyz/form-submit', requestOptions)
    //   const res = await response.json()
    //   console.log(res)
    // } catch (error) {
    //   console.log(error)
    // }
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    console.log(name, value);
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Container id="unix-timestamp" className="section text-start">
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
            disabled={true}
          />
        </Col>
      </Row>
      <Row className="mt-4">
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
      <UnixToDate />
    </Container>
  );
};

export default UnixTime;
