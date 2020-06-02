import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default (props) => {
  const history = useHistory();

  let content = props.dataStory.content;
  return (
    <>
      <Card className="my-3 mx-3" style={{ flex: "25% 0 1" }}>
        <Card.Body>
          <div>
            <Card.Title>{props.dataStory.title}</Card.Title>
            <Card.Text>{content.slice(0, 100)}</Card.Text>
          </div>
        </Card.Body>
        <div>
          <Card.Footer>
            <button
              onClick={() => history.push(`/story/${props.dataStory.id}`)}
            >
              Read More...
            </button>
          </Card.Footer>
        </div>
      </Card>
    </>
  );
};
