import React, { ReactElement } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import docsConfig from "../../../data/docsConfig.json";

interface Props {
    setFileName: (fileName: string) => void;
    fileName: string;
}

const NotesList: React.FC<Props> = ({setFileName, fileName}): ReactElement => {
  const handleClick = (fileName: string) => setFileName(fileName);
  return (
    <ListGroup>
      {docsConfig.map((docConfig, index) => {
        return (
          <ListGroupItem
            action
            as="button"
            key={docConfig.id}
            onClick={() => handleClick(docConfig.fileName)}
            active={fileName === docConfig.fileName}
          >
            {docConfig.name}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default NotesList;
