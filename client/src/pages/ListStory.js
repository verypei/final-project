import React, { useEffect } from "react";
import { CardDeck, Container } from "react-bootstrap";
import Story from "../components/Story";
import { useSelector, useDispatch } from "react-redux";
import { getStories } from "../store/actions/storiesAction";
import logo1 from "../assets/logo1.png"

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
      <h1 className="titleListStory">List Story</h1>
      <Container className="d-flex justify-content-md-center my-2" >
        <div className="listStory">
          <CardDeck>
            {story.map((data, index) => {
              return <Story key={index} dataStory={data} />;
            })}
          </CardDeck>
        </div>
        <div className="logoListStory">
          <img src={logo1} alt="" />
        </div>
      </Container>
    </Container>
    </>
  );
};
