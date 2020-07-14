import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Countdown, { zeroPad } from "react-countdown";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import MuiAlert from "@material-ui/lab/Alert";

import "./Card.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PomodoroCard(props) {
  const {
    card,
    index,
    sessionLength: { work: workLength, break: breakLength },
    dispatch,
  } = props;
  const [content, setContent] = useState(workLength * 60);
  const [stopped, setStopped] = useState(true);
  const [sessionType, setSessionType] = useState("work");
  const [open, setOpen] = useState(false);

  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  function handleStartStop() {
    // if user press stop, card resets
    if (stopped === false) {
      setSessionType("work");
      setContent(workLength * 60);
    }
    setStopped(!stopped);
  }

  return (
    <div>
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
                      if (isNaN(e.target.value))
                        setContent(
                          sessionType === "work"
                            ? workLength * 60
                            : breakLength * 60
                        );
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
                    renderer={({ minutes, seconds, completed }) => {
                      if (completed) {
                        setOpen(true);
                        if (sessionType === "work") {
                          setSessionType("break");
                          setContent(breakLength * 60);
                        } else {
                          setSessionType("work");
                          setContent(workLength * 60);
                        }
                        setStopped(true);
                      } else {
                        setContent(
                          parseInt(minutes, 10) * 60 + parseInt(seconds, 10)
                        );
                      }
                      return (
                        <span
                          style={{
                            color: sessionType === "break" ? "green" : "black",
                          }}
                        >
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {sessionType === "break" ? "Time for a break!" : "Break is over!"}
        </Alert>
      </Snackbar>
    </div>
  );
}
