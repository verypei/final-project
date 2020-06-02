import React, { useEffect } from "react";
import { CardDeck, Container } from "react-bootstrap";
import Story from "../components/Story";
import { useSelector, useDispatch } from "react-redux";
import { getStories } from "../store/actions/storiesAction";
import logo1 from "../assets/logo1.png";

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
    <>
      <Container>
        <h1>Stories</h1>
        <Container>
          <CardDeck className="d-flex justify-content-md-center">
            {story.map((data, index) => {
              return <Story key={index} dataStory={data} />;
            })}
          </CardDeck>
        </Container>
      </Container>
    </>
  );
};
