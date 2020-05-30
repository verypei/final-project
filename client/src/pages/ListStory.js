import React from "react";
import { CardDeck, Container } from "react-bootstrap";
import Story from "../components/Story";

export default () => {
  let datas = [
    {
      id: 1,
      title: "Morna",
      content:
        "Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.",
      theme: "Game",
      createdBy: "Jessica",
    },
    {
      id: 2,
      title: "Lorem ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry..",
      theme: "Game",
      createdBy: "Chandra",
    },
    {
      id: 3,
      title: "Morna",
      content:
        "Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.",
      theme: "Game",
      createdBy: "Jessica",
    },
    {
      id: 4,
      title: "Lorem ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry..",
      theme: "Game",
      createdBy: "Chandra",
    },
    {
      id: 5,
      title: "Morna",
      content:
        "Morna is a unique world for all players to Experience. This world is a land based on the fantasy series of Morna Tales.",
      theme: "Game",
      createdBy: "Jessica",
    },
    {
      id: 6,
      title: "Lorem ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry..",
      theme: "Game",
      createdBy: "Chandra",
    },
  ];

  return (
    <Container>
      <h1>List Story</h1>
      <Container className="d-flex justify-content-md-center my-2">
        <CardDeck>
          {datas.map((data, index) => {
            return <Story key={index} dataStory={data} />;
          })}
        </CardDeck>
      </Container>
    </Container>
  );
};
