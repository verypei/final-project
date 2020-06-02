import RoomAvailable from "../components/roomAvailable";
import { Modal, Container, Button, Form, CardDeck } from "react-bootstrap";
import logo1 from "../assets/logo1.png";
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
  const [roomLanguage, setRoomLanguage] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("username")) {
      socket.emit("set name", localStorage.getItem("username"));
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
      history.push("/room");
    });
  }, []);

  function createRoom(e) {
    e.preventDefault();
    setShow(false);
    console.log(roomLanguage);
    socket.emit("create room", roomName, roomTheme, roomLanguage);
  }

  function joinRoom(roomId) {
    socket.emit("join room", roomId);
  }

  return (
    <Container>
      <h1>Welcome {localStorage.getItem("username")}</h1>
      <Button className="my-3" variant="success" onClick={handleShow}>
        Create Room
      </Button>

      <CardDeck>
        {rooms.map((room) => {
          return (
            <RoomAvailable
              key={room.id}
              name={room.name}
              theme={room.theme}
              usersCount={room.usersCount}
              maxUser={room.maxUser}
              onClickJoin={() => joinRoom(room.id)}
            ></RoomAvailable>
          );
        })}
      </CardDeck>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={(e) => setRoomName(e.target.value)}
                value={roomName}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Theme</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => setRoomTheme(e.target.value)}
                value={roomTheme}
              >
                <option value="">--Select Theme--</option>
                <option value="Fabel">Fabel</option>
                <option value="Love story">Love story</option>
                <option value="Crime">Crime</option>
                <option value="Horror">Horror</option>
                <option value="Action">Action</option>
                <option value="Family">Family</option>
                <option value="Old memories">Old memories</option>
                <option value="Others">Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => setRoomLanguage(e.target.value)}
                value={roomLanguage}
              >
                <option value="">--Select Language--</option>
                <option value="id-ID">Indonesia</option>
                <option value="en-US">English</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createRoom}>
            Create Room
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
