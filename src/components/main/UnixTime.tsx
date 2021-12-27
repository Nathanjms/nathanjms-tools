import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DateToUnix from "./unixtime/DateToUnix";
import UnixToDate from "./unixtime/UnixToDate";

interface Props {}

const UnixTime: React.FC<Props> = () => {
  return (
    <Container id="unix-timestamp" className="section text-start">
      <UnixToDate />
      {/* <DateToUnix /> */}
    </Container>
  );
};

export default UnixTime;
