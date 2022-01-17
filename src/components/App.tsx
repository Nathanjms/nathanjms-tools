import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "../css/App.css";
import Footer from "./global/Footer";
import Header from "./global/Header";
import NotFound from "./global/NotFound";
import Home from "./main/Home";
import UnixTime from "./main/unixtime/UnixTime";
import CharacterCount from "./main/character-count/CharacterCount";
import ColumnToCsv from "./main/column-to-csv/ColumnToCsv";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className="wrapper container">
          <Home />
          <Routes>
            <Route path="/" element={<UnixTime />} />
            <Route path="/character-count" element={<CharacterCount />} />
            <Route path="/column-to-csv" element={<ColumnToCsv />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
