import React, { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import Countdown from "react-countdown";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TextField from "@material-ui/core/TextField";

import { BoardContext } from "./BoardContext";
import "./TextCard.css";

export default function TextCard(props) {
  const { card, index } = props;
  const [content, setContent] = useState(card.content);
  const [start, setStart] = useState(false);
  const [board, dispatch] = useContext(BoardContext);

  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  }

  function handleStartPause() {
    start = !start;
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
              {start ? (
                <Countdown date={Date.now() + parseInt(content) * 1000} />
              ) : (
                <TextField
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e)}
                  onBlur={() =>
                    dispatch({
                      type: "UPDATE_CARD",
                      cardId: card.id,
                      content: content,
                    })
                  }
                  type="number"
                  defaultValue={card.content}
                />
              )}
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="start-pause"
                style={{ backgroundColor: "transparent" }}
                onClick={() => handleStartPause()}
              >
                {!start ? (
                  <PlayArrowIcon fontSize="small" />
                ) : (
                  <PauseIcon fontSize="small" />
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
