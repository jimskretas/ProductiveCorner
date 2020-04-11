import React, { useContext } from "react";
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

import { BoardContext } from "./BoardContext";
import TextCard from "./TextCard";

const useStyles = makeStyles(theme => ({
  column: {
    backgroundColor: "#EBECF0",
    margin: theme.spacing(1),
    marginTop: theme.spacing(9),
    width: "320px"
  },
  columnTitle: {
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Segoe UI",
    fontSize: "1.2rem",
    fontWeight: "600"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  addButton: {
    backgroundColor: "#EBECF0"
  }
}));

export default function CardList(props) {
  const { column, cards } = props;
  const classes = useStyles();
  const [board, dispatch] = useContext(BoardContext);

  return (
    <Grid item>
      <Card className={classes.column}>
        <CardHeader
          disableTypography
          title={column.title}
          className={classes.columnTitle}
        >
          <h2>{column.title}</h2>
        </CardHeader>
        <Droppable droppableId={column.id}>
          {provided => (
            <CardContent ref={provided.innerRef} {...provided.droppableProps}>
              {cards.map((card, index) => (
                <TextCard key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </CardContent>
          )}
        </Droppable>
        <CardActions className={classes.buttons}>
          <Tooltip title="Add a text card">
            <IconButton
              className={classes.addButton}
              onClick={() =>
                dispatch({ type: "ADD_CARD", columnId: column.id })
              }
              variant="contained"
            >
              <NoteAddIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            className={classes.addButton}
            variant="contained"
            disabled
          >
            <TimerIcon /> {/* Check react-component-countdown-timer */}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
