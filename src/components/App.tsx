import React from "react";
import "../css/App.css";
import { FaSpinner } from "react-icons/fa";
import Footer from "./global/Footer";
import Home from "./main/Home";

function App() {
  return (
    <React.Fragment>
      <div className="wrapper">
        <Home />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
