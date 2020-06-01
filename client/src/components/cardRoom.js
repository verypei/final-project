import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
export default () => {
    return(
        <>
            {/* welcome word */}
            <div>
                <p className="welcomeWord">Welcome xxx</p>
            </div>
            {/* image */}
            <div className="card">
            </div>

            {/* button create room */}
            <div className="createRoomButton">
                <p><FontAwesomeIcon icon={faCommentAlt} size="2x"/>create room</p>
            </div>

            {/* garis pemisah */}
            <div className="horizontalLine">

            </div>
            
            {/* room card */}
            <div className="room">
                <div className="roomExist">
                    <p className="roomTitle">Title</p>
                    <FontAwesomeIcon icon={faCommentAlt} className="iconJoinButton" size="2x"/>
                </div>
            </div>
            
        </>
    )
}