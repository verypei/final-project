import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Login, Detail, ListStory, Room, VoiceToText } from "./pages";
import Navbar from "./components/Navbar";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/story/:id">
              <Detail />
            </Route>
            <Route path="/story">
              <ListStory />
            </Route>
            <Route path="/room">
              <Room />
            </Route>
            <Route path="/voice">
              <VoiceToText />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
