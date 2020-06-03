import React from "react";
import { Card, Button, Col } from "react-bootstrap";
export default (props) => {
  return (
    <>
      <Col md={4}>
        <Card className="mx-3 my-3">
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.theme}</Card.Text>
            <Card.Text>
              {props.language == "en-US" ? "English" : "Indonesia"}
            </Card.Text>
            <Card.Text>
              {props.usersCount} / {props.maxUser} players
            </Card.Text>
            <Card.Text>{props.status}</Card.Text>
          </Card.Body>
          <Button variant="dark" onClick={props.onClickJoin}>
            Join
          </Button>
        </Card>
      </Col>
    </>
  );
};
