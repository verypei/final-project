import React, { useState, useEffect } from "react";
import socket from "../socket";
import { useSpeechRecognition } from "react-speech-kit";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import swal from "sweetalert";

export default () => {
  const history = useHistory();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      if (isCurrentUserTurn) {
        setCurrentStoryText(result);
        socket.emit("input story", result);
      }
    },
  });

  const [currentRoom, setCurrentRoom] = useState(null);

  const [currentRound, setCurrentRound] = useState(null);

  const [currentStoryText, setCurrentStoryText] = useState("");

  const [isCurrentUserTurn, setIsCurrentUserTurn] = useState(false);

  useEffect(() => {
    socket.on("leave room", (result) => {
      setCurrentRoom(null);
      console.log(result);
    });
    socket.on("update room data", (room) => {
      setCurrentRoom(room);
    });
    socket.on("update round", (round) => {
      setCurrentRound(round);
    });
  }, []);

  useEffect(() => {
    if (
      currentRound &&
      currentRoom &&
      currentRoom.status === "playing" &&
      currentRound.currentUserIndex < currentRoom.users.length &&
      currentRoom.users[currentRound.currentUserIndex].id === socket.id
    ) {
      setIsCurrentUserTurn(true);
    } else {
      setIsCurrentUserTurn(false);
      setCurrentStoryText("");
    }
  }, [currentRoom, currentRound]);

  useEffect(() => {
    if (listening && !isCurrentUserTurn) {
      stop();
    }
  }, [listening, isCurrentUserTurn, stop]);

  useEffect(() => {
    if (currentRoom && currentRoom.status === "finished") {
      swal({
        icon: "warning",
        text: "Time is up!!",
      });
      //history.push("/story");
    }
  }, [currentRoom]);

  function startListening() {
    if (isCurrentUserTurn) {
      listen({
        interimResults: true,
        continuous: true,
        lang: currentRoom.language,
      });
    }
  }

  function leaveRoom() {
    socket.emit("leave room");
  }

  function inputCurrentStoryText(event) {
    if (isCurrentUserTurn) {
      setCurrentStoryText(event.target.value);
      socket.emit("input story", event.target.value);
    }
  }

  function renderJoinedRoom() {
    if (!currentRound) {
      return <h2>Not joined a room</h2>;
    } else {
      return (
        <Container>
          <div>
            <h2>Global Countdown : {currentRound.globalCountdown}</h2>
            <h3>
              {" "}
              current turn :{" "}
              {currentRoom.users[currentRound.currentUserIndex].name}
            </h3>
            <h4>Your time : {currentRound.countdown}</h4>
          </div>
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your Story</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  readOnly
                  value={`${currentRound.allText}${currentRound.currentText}`}
                />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Current Input</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  placeholder="input your story in 30 second"
                  value={currentStoryText}
                  onChange={inputCurrentStoryText}
                  readOnly={!isCurrentUserTurn}
                />
                {!listening ? (
                  <Button className="my-3" onClick={startListening}>
                    {" "}
                    <MicIcon style={{ fontSize: 20 }} />
                  </Button>
                ) : (
                  <Button className="my-3" onClick={stop}>
                    {" "}
                    <MicOffIcon style={{ fontSize: 20 }} />
                  </Button>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  // if (currentRound) {
  //   return (
  //     <>
  //       <div>
  //         <div></div>

  //         <div>
  //           <p>Global Countdown: {currentRound.globalCountdown}</p>
  //         </div>

  //         <div>
  //           <textarea
  //             type="text"
  //             placeholder="input your story in 30 second"
  //             value={currentStoryText}
  //             onChange={inputCurrentStoryText}
  //             readOnly={!isCurrentUserTurn}
  //           ></textarea>
  //           <button onClick={startListening}>Start</button>
  //           <button onClick={stop}>Stop</button>
  //           {listening && <div>Go ahead I'm listening</div>}
  //         </div>

  //         <div>
  //           current turn:{" "}
  //           {currentRoom.users[currentRound.currentUserIndex].name}
  //         </div>

  //         <div>
  //           <p className="timer30Second">Countdown: {currentRound.countdown}</p>
  //         </div>

  //         <div className="story">
  //           <h1> your story</h1>
  //           <p>{`${currentRound.allText}${currentRound.currentText}`}</p>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return <>{renderJoinedRoom()}</>;
};
