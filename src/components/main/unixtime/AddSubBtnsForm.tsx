import { add, sub } from "date-fns";
import React, { ReactElement } from "react";
import { Col } from "react-bootstrap";
import { SwalErrorNaNMessage } from "./UnixTime";

interface Props {
  addTime: boolean;
  date: Date;
  setDate: (date: Date) => void;
  quantityToAdd: number;
}

const AddSubBtnsForm: React.FC<Props> = ({
  addTime,
  date,
  setDate,
  quantityToAdd,
}): ReactElement => {
  const handleUnixChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
    var newDate: Date | null = null;

    newDate = addTime
      ? add(date, { [`${e.currentTarget.value}s`]: quantityToAdd })
      : sub(date, { [`${e.currentTarget.value}s`]: quantityToAdd });

    if (isNaN(newDate.getTime())) {
      SwalErrorNaNMessage();
    }
    if (newDate) setDate(newDate); // Set new date if not null.
  };
  return (
    <>
      <Col xs={6} lg={4}>
        <button
          className="btn btn-primary"
          onClick={handleUnixChange}
          value="minute"
        >
          Minute
        </button>
      </Col>
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
      <Col xs={6} lg={4}>
        <button
          className="btn btn-primary"
          onClick={handleUnixChange}
          value="month"
        >
          Month
        </button>
      </Col>
      <Col xs={6} lg={4}>
        <button
          className="btn btn-primary"
          onClick={handleUnixChange}
          value="year"
        >
          Year
        </button>
      </Col>
    </>
  );
};

export default AddSubBtnsForm;
