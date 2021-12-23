import React from "react";
import "../css/App.css";
import Footer from "./global/Footer";
import Header from "./global/Header";
import Home from "./main/Home";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="wrapper">
        <Home />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
