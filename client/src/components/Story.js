import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default (props) => {
  const history = useHistory();

  let content = props.dataStory.content;
  return (
    <>
      <Row>
        <Col>
        
          <Card sm={4} lg={3}>
            <Card.Body>
              <div className="cardBodyStory">
                <Card.Title>{props.dataStory.title}</Card.Title>
                <Card.Text>{content.slice(0, 100)}</Card.Text>
              </div>
            </Card.Body>
            <div className="cardFooter">
              <Card.Footer>
                <button onClick={() => history.push(`/story/${props.dataStory.id}`)} className="buttonReadMore button">
                  Read More...
                </button>
              </Card.Footer>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
