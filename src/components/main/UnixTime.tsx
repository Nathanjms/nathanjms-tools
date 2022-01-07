import React from "react";
import { Container } from "react-bootstrap";
import UnixToDate from "./unixtime/UnixToDate";
// import DateToUnix from "./unixtime/DateToUnix";

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
