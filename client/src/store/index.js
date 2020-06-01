import { createStore, combineReducers, applyMiddleware } from "redux";
import stories from "./reducers/stories";

import thunk from "redux-thunk";

const reducer = combineReducers({
  stories,
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
