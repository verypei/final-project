import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default (props) => {
  const history = useHistory();

  let content = props.dataStory.content;
  return (
    <>
      <Row className="card-Row">
        <Col className="card-body">
        
          <Card sm={4} lg={3} md={5}>
            <Card.Body>
              <div className="cardBodyStory">
                <Card.Title className="titleStory">{props.dataStory.title}</Card.Title>
                <Card.Text className="titleStory">{content.slice(0, 100)}</Card.Text>
              </div>
            </Card.Body>
            <div className="cardFooter">
                  <Button onClick={() => history.push(`/story/${props.dataStory.id}`)} variant="contained"
                  color="primary">
                  Read More...
                </Button>
            </div>
          </Card>

        </Col>
      </Row>
    </>
  );
};
