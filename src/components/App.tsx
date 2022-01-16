import React from "react";
import "../css/App.css";
import Footer from "./global/Footer";
import Header from "./global/Header";
import Home from "./main/Home";
import UnixTime from "./main/unixtime/UnixTime";
import CharacterCount from "./main/character-count/CharacterCount";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="wrapper container">
        <Home />
        <UnixTime />
        <CharacterCount />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
