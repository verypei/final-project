import React, { useEffect } from "react";
import { CardDeck, Container } from "react-bootstrap";
import Story from "../components/Story";
import { useSelector, useDispatch } from "react-redux";
import { getStories } from "../store/actions/storiesAction";

export default () => {
  const dispatch = useDispatch();
  const { story, loading } = useSelector((state) => state.stories);
  // console.log(story);

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h1>List Story</h1>
      <Container className="d-flex justify-content-md-center my-2">
        <CardDeck>
          {story.map((data, index) => {
            return <Story key={index} dataStory={data} />;
          })}
        </CardDeck>
      </Container>
    </Container>
  );
};
