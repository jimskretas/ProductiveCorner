import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import TimerIcon from "@material-ui/icons/Timer";

import cardLimits from "./globalVars";
import TextCard from "./TextCard";
import PomodoroCard from "./PomodoroCard";

const useStyles = makeStyles((theme) => ({
  column: {
    backgroundColor: "#EBECF0",
    margin: theme.spacing(1),
    marginTop: theme.spacing(9),
    width: "320px",
  },
  columnTitle: {
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Segoe UI",
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#EBECF0",
  },
}));

export default function CardList(props) {
  const { column, cards, dispatch } = props;
  const classes = useStyles();

  const cardCount = column.cardIds.length;
  const cardLimit = cardLimits[column.id];
  const cardCountText =
    cardCount > 0 ? "(" + cardCount + "/" + cardLimit + ")" : "";

  return (
    <Grid item>
      <Card data-cy={column.id} className={classes.column}>
        <CardHeader
          disableTypography
          title={column.title + cardCountText}
          className={classes.columnTitle}
        >
          <h2>{column.title}</h2>
        </CardHeader>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <CardContent ref={provided.innerRef} {...provided.droppableProps}>
              {cards.map((card, index) => {
                if (card.category === "text") {
                  return (
                    <TextCard
                      key={card.id}
                      card={card}
                      index={index}
                      dispatch={dispatch}
                    />
                  );
                } else {
                  return (
                    <PomodoroCard
                      key={card.id}
                      card={card}
                      index={index}
                      dispatch={dispatch}
                    />
                  );
                }
              })}
              {provided.placeholder}
            </CardContent>
          )}
        </Droppable>
        <CardActions className={classes.buttons}>
          <Tooltip title="Add a text card">
            <IconButton
              className={classes.addButton}
              onClick={() =>
                dispatch({
                  type: "ADD_CARD",
                  columnId: column.id,
                  category: "text",
                })
              }
              variant="contained"
            >
              <NoteAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add a pomodoro card">
            <IconButton
              className={classes.addButton}
              onClick={() =>
                dispatch({
                  type: "ADD_CARD",
                  columnId: column.id,
                  category: "pomodoro",
                })
              }
              variant="contained"
            >
              <TimerIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
}
