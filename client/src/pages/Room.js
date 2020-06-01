import React from "react";

export default () => {
  return (
    <>
    
      <div className="imageBackground"></div>
          <div className="timerFiveMinutes">
            <p>05:00</p>
          </div>

          <div>
            <textarea type="text" className="inputStoryBox input" placeholder="input your story in 30 second"></textarea>
          </div>

          <div>
            <p className="timer30Second">30</p>
          </div>

          <div className="story">
            <h1 className="titleOutputStory"> your story</h1>
            <p className="outputStory">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
            took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s 
            with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>

          {/* <div>
            <button className="submitTextButton button">submit</button>
          </div> */}
    

    </>
  );
};
