import React, { ReactElement } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../css/App.css";
import NotFound from "./global/NotFound";
import UnixTime from "./main/unixtime/UnixTime";
import CharacterCount from "./main/character-count/CharacterCount";
import ColumnToCsv from "./main/column-to-csv/ColumnToCsv";
import Default from "./global/Default";
import Notes from "./main/notes/Notes";

interface AppProps {}

export const App: React.FC<AppProps> = (): ReactElement => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Default component={<UnixTime />} />} />
          <Route
            path="/character-count"
            element={<Default component={<CharacterCount />} />}
          />
          <Route
            path="/column-to-csv"
            element={<Default component={<ColumnToCsv />} />}
          />
         <Route
            path="/documents"
            element={<Default component={<Notes />} />}
          />
          <Route
            path="*"
            element={<Default component={<NotFound />} nj={false} />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
