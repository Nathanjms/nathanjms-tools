import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

export default class UnixTime extends Component {
  unixTime = Math.floor(Date.now() / 1000);
  render() {
    return (
      <Row id="unix-timestamp" className="section text-start">
        <Col>
          <h2>Unix Timestamp</h2>
          <p>The Current Unix Timestamp is <em>{this.unixTime}</em>.</p>
        </Col>
      </Row>
    );
  }
}
