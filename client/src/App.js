import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Login, Detail, ListStory, Room, VoiceToText } from "./pages";
import Navbar from "./components/Navbar";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          {showNavbar ? <Navbar></Navbar> : null}
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
              <Room setShowNavbar={setShowNavbar} />
            </Route>
            <Route path="/voice">
              <VoiceToText />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>

    // function App() {
    //   return (
    //     <div className="App">
    //       <UserName />
    //       <Room />
    //     </div>
  );
}

export default App;
