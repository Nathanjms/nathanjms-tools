import React, { ReactElement, useRef } from "react";
import { add, sub } from "date-fns";
import { Col } from "react-bootstrap";
import { SwalErrorNaNMessage } from "./UnixTime";
import AddSubBtn from "./AddSubBtn";

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
  const error = useRef<boolean>(false);
  const buttonNames = ["Minute", "Hour", "Day", "Week", "Month", "Year"];
  const handleUnixChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (error.current) {
      console.log("aborting due to error...");
      return;
    }
    var newDate: Date | null = null;

    newDate = addTime
      ? add(date, { [`${e.currentTarget.value}s`]: quantityToAdd })
      : sub(date, { [`${e.currentTarget.value}s`]: quantityToAdd });

    if (isNaN(newDate.getTime())) {
      SwalErrorNaNMessage();
      error.current = true;
    }
    if (newDate) setDate(newDate); // Set new date if not null.
  };

  return (
    <>
      {buttonNames.map((btnName, index) => {
        return (
          <Col key={index} xs={6} lg={4}>
            <AddSubBtn
              name={btnName}
              value={btnName.toLowerCase()}
              handleUnixChange={handleUnixChange}
            />
          </Col>
        );
      })}
    </>
  );
};

export default AddSubBtnsForm;
