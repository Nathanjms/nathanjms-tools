import React from "react";
import "../css/App.css";
import { FaSpinner } from "react-icons/fa";
import Footer from "./global/Footer";

function App() {
  return (
    <React.Fragment>
      <div className="wrapper">
        <header className="App-header">
          <h1>Nathan James.</h1>
          <p>
            <FaSpinner className="spinner" />
          </p>
          <p>Coming Soon...</p>
        </header>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
