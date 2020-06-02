import React, { useEffect, useState } from 'react';
//import useSocket from './socketHook';
//import useSocket from 'use-socket.io-client';
import socket from '../socket';

export default function RoomTest() {
  const [name, setName] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('test');
    });

    socket.on('set name', (result) => {
      console.log(result);
    });
  }, []);

  function changeName() {
    socket.emit('set name', name);
  }

  return (
    <div>
      <h1>Hello</h1>
      <input type='text' onChange={(e) => setName(e.target.value)} value={name} />
      <button onClick={changeName}>Set Username</button>
    </div>
  )
}