import React, { ReactElement } from "react";
import { Container } from "react-bootstrap";
import "../../css/App.css";
import Home from "../main/Home";
import Footer from "./Footer";
import Header from "./Header";

interface DefaultProps {
  component: ReactElement;
}

const Default: React.FC<DefaultProps> = ({ component }): ReactElement => {
  return (
    <>
      <Header />
      <Container className="wrapper">
        <Home />
        {component}
      </Container>
      <Footer />
    </>
  );
};

export default Default;
