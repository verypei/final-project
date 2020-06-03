import React, { useState, useEffect } from "react";
import RoomAvailable from "../components/roomAvailable";
import { Modal, Container,Form, Row } from "react-bootstrap";
import socket from "../socket";
import { useHistory, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import RoomEmpty from "../assets/book.svg";

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
    console.log('test');
    socket.on("get rooms", (roomsFromServer) => {
      console.log(roomsFromServer);
      setRooms(roomsFromServer);
    });
    socket.on("create room", (result) => {
      console.log(result);
      if(!result.success){
        swal({
          icon: "error",
          text: result.message,
        });
      }
    });
    socket.on("join room", (result) => {
      console.log(result);
      if(result.success) {
        history.push("/room");
      } else {
        swal({
          icon: "error",
          text: result.message,
        });
      }
    });
    return () => {
      socket.off("get rooms");
    };
  }, []);

  function createRoom(e) {
    e.preventDefault();
    // setShow(false);
   
    console.log(roomLanguage);
    socket.emit("create room", roomName, roomTheme, roomLanguage);
  }

  function joinRoom(roomId) {
    socket.emit("join room", roomId);
  }

  if (!localStorage.getItem("username")) {
    return <Redirect to="/" />;
  }
  return (
    <>
    <Container>
      <h1>Welcome {localStorage.getItem("username")}</h1>
      <Button className="my-3"  
          variant="contained"
          color="primary" 
          onClick={handleShow}>
        Create Room
      </Button>

      {rooms && rooms.length ? (
      <Row>
        {rooms.map((room) => {
          return (
            <RoomAvailable
              key={room.id}
              name={room.name}
              theme={room.theme}
              language={room.language}
              usersCount={room.usersCount}
              maxUser={room.maxUser}
              onClickJoin={() => joinRoom(room.id)}
              status={room.status}
            ></RoomAvailable>
          );
        })}
      </Row>
      ) : (
        <div>
          <img src={RoomEmpty} className="imageRoomEmpty" alt=""></img>
          <h3>It's quite empty in here, create a room to make a stOURy!</h3>
        </div>
      )}

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
          <Button variant="contained"
            color="default" className="mx-3" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="contained"
            color="primary" onClick={createRoom}>
            Create Room
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </>
  );
};
