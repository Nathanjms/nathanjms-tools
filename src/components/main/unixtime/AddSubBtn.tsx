import React, { ReactElement } from "react";

interface Props {
  value: string;
  name: string;
  handleUnixChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddSubBtn: React.FC<Props> = ({
  value,
  name,
  handleUnixChange,
}): ReactElement => {
  return (
    <button
      className="btn btn-primary"
      onClick={handleUnixChange}
      value={value}
    >
      {name}
    </button>
  );
};

export default AddSubBtn;
