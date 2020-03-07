import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Grid from "@material-ui/core/Grid";
import "./TextCard.css";
import DeleteCardButton from "./DeleteCardButton";
import { Draggable } from "react-beautiful-dnd";
import { BoardContext } from "./BoardContext";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(1),
    backgroundColor: "#F8F9F9"
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function TextCard(props) {
  const classes = useStyles();
  const [content, setContent] = useState(props.card.content);
  const [state, setState] = useContext(BoardContext);

  function updateCard(id) {
    // Update state with the new card content if it changed
    let newCards = state.cards;
    let oldStateContent = newCards[id].content;
    if (oldStateContent !== content) {
      newCards[id] = { ...newCards[id], content: content };
      let newState = {
        ...state,
        cards: newCards
      };

      setState(newState);
    }
  }

  function handleOnChange(value) {
    setContent(value);
  }

  return (
    <Draggable draggableId={props.card.id} index={props.index}>
      {provided => (
        <div
          className="cardContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card className={classes.root}>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={2}>
                <IconButton
                  {...provided.dragHandleProps}
                  disableRipple
                  aria-label="delete"
                  style={{ backgroundColor: "transparent" }}
                >
                  <DragIndicatorIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item xs={9}>
                <InputBase
                  onChange={e => handleOnChange(e.target.value)}
                  onBlur={() => updateCard(props.card.id)}
                  className={classes.margin}
                  multiline
                  fullWidth
                  defaultValue={props.card.content}
                />
              </Grid>
              <Grid item xs={1} className="trashButton">
                <DeleteCardButton id={props.card.id} />
              </Grid>
            </Grid>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
