import RoomAvailable from '../components/roomAvailable'
import {Modal} from 'react-bootstrap'
import logo1 from "../assets/logo1.png"
import React, { useState, useEffect } from "react";
import socket from "../socket";
import { useHistory } from "react-router-dom";

export default () => {
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rooms, setRooms] = useState([]);

    const [roomName, setRoomName] = useState("");
    const [roomTheme, setRoomTheme] = useState("");

    const history = useHistory();
    useEffect(() => {
      if(localStorage.getItem("username")){
          socket.emit("set name",localStorage.getItem("username"));
      }
      socket.emit("get rooms");
      socket.on("get rooms", (roomsFromServer) => {
        console.log(roomsFromServer);
        setRooms(roomsFromServer);
      });
      socket.on("create room", (result) => {
        console.log(result);
      });
      socket.on("join room", (result) => {
        console.log(result);
        history.push({pathname:"/room",state:{a:"a"}});
      });
    }, []);

    
    function createRoom(e) {
      e.preventDefault();
      setShow(false);
      socket.emit("create room", roomName, roomTheme);
    }
  
    function joinRoom(roomId) {
      socket.emit("join room", roomId);
    }

  return (
    <>
      <div className="roomAvailableHome">
        {/* <RoomAvailable></RoomAvailable> */}
        <h1>Room List</h1>
          {/* <ul> */}
            {rooms.map((room) => {
              return (
                <RoomAvailable key={room.id} name={room.name} theme={room.theme} usersCount={room.usersCount} maxUser={room.maxUser} onClickJoin={() => joinRoom(room.id)}>
                
                  {/* <button onClick={() => joinRoom(room.id)}>Join</button> */}
                </RoomAvailable>
              );
            })}
          {/* </ul> */}
      </div>
            <img src={logo1} className="imageHome" alt=""></img>
            <button className="createRoomButton button" onClick={handleShow}>
              create room
            </button>

            <Modal show={show} onHide={handleClose}>

              <form className="formCreateRoom">

                  <input type="text" placeholder="title" className="inputTitleModal input" onChange={(e) => setRoomName(e.target.value)}
                      value={roomName}>
                  </input>

                  <br></br>
                  <select className="selectTheme input" onChange={(e) => setRoomTheme(e.target.value)}
                    value={roomTheme}>

                    <option value="Fabel">Fabel</option>
                    <option value="Love story">Love story</option>
                    <option value="Crime">Crime</option>
                    <option value="Horror">Horror</option>
                    <option value="Action">Action</option>
                    <option value="Family">Family</option>
                    <option value="Old memories">Old memories</option>
                    <option value="Others">Others</option>

                  </select>
                  <div className="buttonModalFlexDirection">
                    <button className="buttonCreateModal buttonModal button" onClick={createRoom}>create</button>
                    <button className="buttonCancelModal buttonModal button">cancel</button>
                  </div> 
              </form>

            </Modal>  
    </>
  );
};
