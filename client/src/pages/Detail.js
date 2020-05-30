import React from "react";
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  return (
    <>
      <h1>Ini Detail story dengan id = {id}</h1>
    </>
  );
};
