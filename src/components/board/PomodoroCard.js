import React, { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import Countdown, { zeroPad } from "react-countdown";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import TextField from "@material-ui/core/TextField";

import { BoardContext } from "./BoardContext";
import "./TextCard.css";

export default function TextCard(props) {
  const { card, index } = props;
  const [board, dispatch] = useContext(BoardContext);
  const [content, setContent] = useState(card.content);
  const [stopped, setStopped] = useState(true);

  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  }

  function handleStartStop() {
    setStopped(!stopped);
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <Card
          className="cardContainer"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={2}>
              <IconButton
                {...provided.dragHandleProps}
                aria-label="handle"
                style={{ backgroundColor: "transparent" }}
              >
                <DragIndicatorIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              {stopped ? (
                <TextField
                  value={Math.floor(parseInt(content, 10) / 60)}
                  onChange={(e) => {
                    if (isNaN(e.target.value)) setContent(25 * 60);
                    else if (e.target.value > 60) setContent(60 * 60);
                    else if (e.target.value < 1) setContent(1 * 60);
                    else setContent(e.target.value * 60);
                  }}
                  onKeyDown={(e) => handleKeyPress(e)}
                  onBlur={() =>
                    dispatch({
                      type: "UPDATE_CARD",
                      cardId: card.id,
                      content: content,
                    })
                  }
                  type="number"
                />
              ) : (
                <Countdown
                  date={Date.now() + parseInt(content, 10) * 1000}
                  zeroPadTime={2}
                  renderer={({ minutes, seconds }) => {
                    setContent(
                      parseInt(minutes, 10) * 60 + parseInt(seconds, 10)
                    );
                    return (
                      <span>
                        {zeroPad(minutes)}:{zeroPad(seconds)}
                      </span>
                    );
                  }}
                />
              )}
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="start-stop"
                style={{ backgroundColor: "transparent" }}
                onClick={() => handleStartStop()}
              >
                {stopped ? (
                  <PlayArrowIcon fontSize="small" />
                ) : (
                  <StopIcon fontSize="small" />
                )}
              </IconButton>
            </Grid>
            <Grid item xs={2} className="trashButton">
              <IconButton
                aria-label="delete-card"
                onClick={() =>
                  dispatch({ type: "DELETE_CARD", cardId: card.id })
                }
                style={{ backgroundColor: "transparent" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      )}
    </Draggable>
  );
}
