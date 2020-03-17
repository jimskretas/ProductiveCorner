import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Grid from "@material-ui/core/Grid";
import "./TextCard.css";
import { Draggable } from "react-beautiful-dnd";
import { BoardContext } from "./BoardContext";

const useStyles = makeStyles(theme => ({
  card: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(1),
    backgroundColor: "FFF"
  },
  inputMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function TextCard(props) {
  const { card, index } = props;
  const classes = useStyles();
  const [content, setContent] = useState(card.content);
  const [board, dispatch] = useContext(BoardContext);

  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <div
          className="cardContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card className={classes.card}>
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
                  className={classes.inputMargin}
                  multiline
                  fullWidth
                  defaultValue={card.content}
                />
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
