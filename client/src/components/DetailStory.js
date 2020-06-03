import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardDeck, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getStoryDetail } from "../store/actions/storiesAction";
import Speech from "speak-tts";
import html2canvas from "html2canvas";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import jsPDF from "jspdf";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

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
          onend: () => {
            console.log("End utterance");
          },
          onresume: () => {
            console.log("Resume utterance");
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

  function exportDocument() {
    // const input = document.getElementById("export");
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   pdf.save(storyDetail.title + ".pdf");
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
          <Card.Body id="export">
            <Card.Title>{storyDetail.title}</Card.Title>
            <Card.Text>{storyDetail.content}</Card.Text>
          </Card.Body>

          <Card.Footer>
            <small className="text-muted" style={{ float: "left" }}> {storyDetail.createdBy}</small>
            <Button
              className="py-1"
              onClick={() => speech.cancel()}
              style={{ float: "right" }}
            >
              {" "}
              <StopIcon style={{ fontSize: 20 }} />
            </Button>
            <Button
              onClick={() => _init()}
              className="mx-3 py-1"
              style={{ float: "right" }}
            >
              {" "}
              <PlayArrowIcon style={{ fontSize: 20 }} />
            </Button>
            <Button
              onClick={exportDocument}
              className="mx-3 py-1"
              style={{ float: "right" }}
            >
              {" "}
              <PictureAsPdfIcon style={{ fontSize: 20 }} />
            </Button>
          </Card.Footer>
        </Card>
      </CardDeck>
    </>
  );
};
