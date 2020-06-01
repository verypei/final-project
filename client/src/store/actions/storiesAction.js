import { GET_STORY, GET_STORY_DETAIL } from "./types";
const url = "http://localhost:3001/stories";

export function getStories() {
  return (dispatch, getState) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_STORY,
          payload: {
            story: data,
          },
        });
      });
  };
}

export function getStoryDetail(id) {
  return (dispatch) => {
    fetch(`${url}/detail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_STORY_DETAIL,
          payload: {
            storyDetail: data,
          },
        });
      });
  };
}
