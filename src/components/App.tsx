import React from "react";
import "../css/App.css";
import Footer from "./global/Footer";
import Header from "./global/Header";
import Home from "./main/Home";
import UnixTime from "./main/UnixTime";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="wrapper container">
        <Home />
        <UnixTime />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
