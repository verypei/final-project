import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export default () => {
  const [value, setValue] = useState("");

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  return (
    <div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        onClick={() =>
          listen({ interimResults: true, continuous: true, lang: "id-ID" })
        }
      >
        Start
      </button>
      <button onClick={stop}>Stop</button>
      {listening && <div>Go ahead I'm listening</div>}
    </div>
  );
};
