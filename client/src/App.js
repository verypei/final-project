import React from 'react';
import './App.css';
import UserName from './roomComponents/UserName';
import Room from './roomComponents/Room';

function App() {
  return (
    <div className="App">
      <UserName />
      <Room />
    </div>
  );
}

export default App;