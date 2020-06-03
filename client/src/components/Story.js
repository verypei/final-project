import React from "react";
import { Card, Row, Col} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default (props) => {
  const history = useHistory();

  let content = props.dataStory.content;
  return (
    <>
      <Col md={10} >
        <Card className="my-3 mx-3">
          <Card.Body>
            <div>
              <Card.Title>{props.dataStory.title}</Card.Title>
              <Card.Text>{content.slice(0, 100)}</Card.Text>
            </div>
          </Card.Body>
          <div>
            <Card.Footer>
              <Button
                 variant="contained"
                 color="primary"
                onClick={() => history.push(`/story/${props.dataStory.id}`)}
              >
                Read More...
              </Button>
            </Card.Footer>
          </div>
        </Card>
      </Col>
    </>
  );
};
