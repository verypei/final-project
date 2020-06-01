import React,{useState} from "react";
import RoomAvailable from '../components/roomAvailable'
import {Modal} from 'react-bootstrap'
import logo1 from "../assets/logo1.png"
export default () => {

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <div className="roomAvailableHome">
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
        <RoomAvailable></RoomAvailable>
      </div>
            <img src={logo1} className="imageHome" alt=""></img>
            <button className="createRoomButton button" onClick={handleShow}>
              create room
            </button>

            <Modal show={show} onHide={handleClose}>

              <form className="formCreateRoom">
                  <input type="text" placeholder="title" className="inputTitleModal input"></input>
                  <br></br>
                  <select className="selectTheme input">
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
                    <button className="buttonCreateModal buttonModal button">create</button>
                    <button className="buttonCancelModal buttonModal button">cancel</button>
                  </div> 
              </form>

            </Modal>  
    </>
  );
};
