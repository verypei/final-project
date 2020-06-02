import React from "react";
import { Container } from "react-bootstrap";
import DetailStory from "../components/DetailStory";

export default () => {
  return (
    <>
      
      <h1 className="titleListStory">Detail story </h1>
      <Container className="d-flex justify-content-md-center my-2">
        <DetailStory />
      </Container>
    </>
  );
};
