import React from "react";
import { Card, Button } from "react-bootstrap";
export default (props) => {
  return (
    <>
      <Card style={{ flex: "33% 0 1" }}>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.theme}</Card.Text>
          <Card.Text>
            {props.usersCount} / {props.maxUser}
          </Card.Text>
        </Card.Body>
        <Button variant="dark" onClick={props.onClickJoin}>
          Join
        </Button>
      </Card>
    </>
  );
};
