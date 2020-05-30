import React from "react";
import { useParams } from "react-router-dom";
import { CardDeck, Card } from "react-bootstrap";

export default () => {
  const { id } = useParams();

  let data = {
    title: "Morna",
    content:
      "Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.",
    theme: "Game",
    createdBy: "Jessica, Evandy",
  };

  return (
    <>
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.content}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{data.createdBy}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </>
  );
};
