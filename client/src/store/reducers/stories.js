import { GET_STORY, GET_STORY_DETAIL } from "../actions/types";

const initialState = {
  story: [],
  storyDetail: {},
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORY: {
      return { ...state, story: action.payload.story, loading: false };
    }
    case GET_STORY_DETAIL:
      return {
        ...state,
        storyDetail: action.payload.storyDetail,
        loading: false,
      };
    default:
      return state;
  }
};
