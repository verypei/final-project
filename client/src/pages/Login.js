import React,{ useEffect, useState } from "react";
import logo1 from '../assets/logo1.png'
import socket from '../socket';
import { useHistory } from "react-router-dom";

export default () => {
  
  const history = useHistory();
  const [name, setName] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('test');
    });

    socket.on('set name', (result) => {
      console.log(result);
      history.push("/home");
    });
  }, []);

  function changeName() {
    localStorage.setItem("username",name);
    socket.emit('set name', name);
  }

  return (
    <>
    <div className="login">
       <img className="imageLogin" alt="" src={logo1}></img>
       <input type="text" className="inputLogin input" placeholder="username" onChange={(e) => setName(e.target.value)} value={name}></input>
       <button className="buttonLogin button" onClick={changeName}>start</button>
    </div>
    </>
  );
};
