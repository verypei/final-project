import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardDeck, Card} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getStoryDetail } from "../store/actions/storiesAction";
import Speech from "speak-tts";
import jsPDF from 'jspdf';


export default () => {
  const { id } = useParams();
  const { storyDetail, loading } = useSelector((state) => state.stories);
    console.log(storyDetail, loading);

  const speech = new Speech(); // will throw an exception if not browser supported
  if (speech.hasBrowserSupport()) {
    // returns a boolean
    console.log("speech synthesis supported");
  }

  function _init() {
    const speech = new Speech();
    speech
      .init({
        volume: 0.5,
        lang: "id-ID",
        rate: 1,
        pitch: 1,
        //'voice':'Google UK English Male',
        //'splitSentences': false,
        listeners: {
          onvoiceschanged: (voices) => {
            console.log("Voices changed", voices);
          },
        },
      })
      .then((data) => {
        console.log("Speech is ready", data);
        _prepareSpeakButton(speech);
      })
      .catch((e) => {
        console.error("An error occured while initializing : ", e);
      });
  }

  function _prepareSpeakButton(speech) {
    speech
      .speak({
        text: storyDetail.content,
        queue: false,
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onboundary: (event) => {
            console.log(
              event.name +
                " boundary reached after " +
                event.elapsedTime +
                " milliseconds."
            );
          },
        },
      })
      .then((data) => {
        console.log("Success !", data);
      })
      .catch((e) => {
        console.error("An error occurred :", e);
      });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStoryDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  function exportDocument(){
    const pdf = new jsPDF();
    pdf.fromHTML((
      `
      <h1>${storyDetail.title}</h1>
      <h2 style="font-size: 1em">Created By: ${storyDetail.createdBy} | Theme: ${storyDetail.theme}</h2>
      <p>${storyDetail.content}</p>
      `
    ), 15, 15, {
      width: 180
    });
    pdf.save(storyDetail.title+'.pdf');
  }

  return (
    <>
      <CardDeck>
        <Card>
          <Card.Body id='export' >
            <Card.Title>{storyDetail.title}</Card.Title>
            <Card.Text>{storyDetail.content}</Card.Text>
          </Card.Body>

          <Card.Footer>
            <div className="cardFooter">
                <small className="textMutedCreatedBy">{storyDetail.createdBy}</small>
                <button variant="dark" onClick={() => _init()} className="buttonPlay button">
                  Play
                </button>
                <div className="exportToPdfLogo" onClick={exportDocument}>
                  <i className="fas fa-file-pdf"></i>
                </div>
            </div>

          </Card.Footer>
          
        </Card>
      </CardDeck>
    </>
  );
};
