import React, { useState, useEffect } from 'react';
import socket from '../socket';

export default function Room() {
    const [rooms, setRooms] = useState([]);

    const [roomName, setRoomName] = useState('');

    const [currentRoom, setCurrentRoom] = useState(null);

    useEffect(() => {
        socket.emit('get rooms');
        socket.on('get rooms', (roomsFromServer) => {
            console.log(roomsFromServer);
            setRooms(roomsFromServer);
        });
        socket.on('create room', (result) => {
            console.log(result);
        });
        socket.on('join room', (result) => {
            console.log(result);
        });
        socket.on('leave room', (result) => {
            setCurrentRoom(null);
            console.log(result);
        });
        socket.on('update room data', (room) => {
            setCurrentRoom(room);
        });
    }, []);

    function createRoom() {
        socket.emit('create room', roomName);
    }

    function joinRoom(roomId) {
        socket.emit('join room', roomId);
    }

    function leaveRoom() {
        socket.emit('leave room');
    }

    function renderJoinedRoom() {
        if (currentRoom) {
            return (
                <div>
                    <h2>User List</h2>
                    <ul>
                        {currentRoom.users.map(user => {
                            return (
                                <li key={user.id}>{user.name}</li>
                            )
                        })}
                    </ul>
                    <button onClick={leaveRoom}>Leave room</button>
                </div>
            )
        } else {
            return <h2>Not joined a room</h2>
        }
    }

    return (
        <div>
            <h1>Create Room</h1>
            <input type="text" onChange={e => setRoomName(e.target.value)} value={roomName} />
            <button onClick={createRoom}>Create Room</button>
            <h1>Room List</h1>
            <ul>
                {rooms.map(room => {
                    return (
                        <li key={room.id}>{room.name} ({room.usersCount}/{room.maxUser}) <button onClick={() => joinRoom(room.id)}>Join</button></li>
                    )
                })}
            </ul>
            <h1>Joined Room</h1>
            {renderJoinedRoom()}
        </div>
    )
}