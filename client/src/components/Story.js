import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default (props) => {
  const history = useHistory();

  let content = props.dataStory.content;
  return (
    <>
      <Row>
        <Col>
          <Card sm={4} md={3} lg={3} className="my-2">
            <Card.Body>
              <Card.Title>{props.dataStory.title}</Card.Title>
              <Card.Text>{content.slice(0, 100)}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="dark"
                onClick={() => history.push(`/story/${props.dataStory.id}`)}
                className="mx-3"
              >
                Read More...
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};
