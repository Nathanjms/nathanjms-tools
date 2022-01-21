import React, { ReactElement } from "react";
import { Container } from "react-bootstrap";
import "../../css/App.css";
import Home from "../main/Home";
import Footer from "./Footer";
import Header from "./Header";

interface DefaultProps {
  component: ReactElement;
  header?: boolean;
  footer?: boolean;
  nj?: boolean;
}

const Default: React.FC<DefaultProps> = ({
  component,
  header = true,
  footer = true,
  nj = true,
}): ReactElement => {
  return (
    <>
      {header && <Header />}
      <Container className="wrapper">
        {nj && <Home />}
        {component}
      </Container>
      {footer && <Footer />}
    </>
  );
};

export default Default;
