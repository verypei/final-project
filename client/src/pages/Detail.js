import React from "react";
import { Container } from "react-bootstrap";
import DetailStory from "../components/DetailStory";

export default () => {
  return (
    <Container>
      <h3>Detail story </h3>
      <Container>
        <DetailStory />
      </Container>
    </Container>
  );
};
