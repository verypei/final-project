import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Login, Detail, ListStory, Room } from "./pages";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/home">
            <Home />
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
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
