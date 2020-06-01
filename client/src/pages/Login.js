import React from "react";
import logo1 from "../assets/logo1.png"
export default () => {
  return (
    <>
    <div className="login">
       <img className="imageLogin" alt="" src={logo1}></img>
       <input type="text" className="inputLogin input"></input>
       <button className="buttonLogin button">start</button>
    </div>
    </>
  );
};
