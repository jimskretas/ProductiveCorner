import React, { useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Grid from "@material-ui/core/Grid";
import "./TextCard.css";
import { Draggable } from "react-beautiful-dnd";
import { BoardContext } from "./BoardContext";

export default function TextCard(props) {
  const { card, index } = props;
  const [content, setContent] = useState(card.content);
  const [board, dispatch] = useContext(BoardContext);

  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <div
          className="cardContainer"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Card>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={2}>
                <IconButton
                  {...provided.dragHandleProps}
                  disableRipple
                  aria-label="handle"
                  style={{ backgroundColor: "transparent" }}
                >
                  <DragIndicatorIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <InputBase
                  onChange={e => setContent(e.target.value)}
                  onBlur={() =>
                    dispatch({
                      type: "UPDATE_CARD",
                      cardId: card.id,
                      content: content
                    })
                  }
                  // multiline
                  fullWidth
                  defaultValue={card.content}
                />
                {/* {card.content} */}
              </Grid>
              <Grid item xs={2} className="trashButton">
                <IconButton
                  aria-label="delete"
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
        </div>
      )}
    </Draggable>
  );
}
