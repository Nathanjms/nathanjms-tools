import React from "react";
import { Col, Row } from "react-bootstrap";

type Props = {};
type MyState = {
  // using `interface` is also ok
  datetime: string;
};
export default class UnixTime extends React.Component<Props, MyState> {
  private date: number;
  private unixTime: number;
  constructor(props: Props) {
    super(props);
    this.date = Date.now();
    this.unixTime = Math.floor(this.date / 1000);
    this.state = {
      datetime: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // No longer need to cast to any - hooray for react!
    this.setState({datetime: event.target.value});
    console.log(event.target.value);
  }

  render() {
    return (
      <Row id="unix-timestamp" className="section text-start">
        <Col xs={12}>
          <h2>Unix Timestamp</h2>
        </Col>
        <Col>
          <p>
            The Current Unix Timestamp is <em>{this.unixTime}</em>.
          </p>
          <input
            type="text"
            className="chat"
            value={this.state.datetime}
            onChange={this.handleChange}
          />
        </Col>
      </Row>
    );
  }
}
