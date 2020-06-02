import React from "react";

export default (props) => {
  // console.log(props,"=====================")

  return (
    <>
        <div className="roomAvailable">
            <p className="titleRoomAvailable">{props.name}</p>
            <p>{props.theme}</p>
            <p>{props.usersCount} / {props.maxUser}</p>
            <button onClick={props.onClickJoin}>join</button>
        </div>
    </>
  );
};
