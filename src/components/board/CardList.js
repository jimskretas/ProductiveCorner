import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import TimerIcon from "@material-ui/icons/Timer";

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
  const { column, cards, limit, sessionLength, dispatch } = props;
  const [open, setOpen] = useState(false); // for delete all cards dialog
  const classes = useStyles();

  const cardCount = column.cardIds.length;
  const cardLimit = limit;
  const cardCountText =
    cardCount > 0 ? "(" + cardCount + "/" + cardLimit + ")" : "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCards = () => {
    dispatch({
      type: "DELETE_ALL_CARDS",
      columnId: column.id,
    });
    setOpen(false);
  };

  return (
    <Grid item>
      <Card data-cy={column.id} className={classes.column}>
        <CardHeader
          disableTypography
          className={classes.columnTitle}
          title={column.title + cardCountText}
          action={
            <Tooltip title="Delete all cards">
              <span>
                <IconButton
                  aria-label="delete-all-cards"
                  data-cy="delete-all-cards"
                  disabled={cardCount === 0}
                  onClick={handleClickOpen}
                  display="inline"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          }
        />
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
                      sessionLength={sessionLength}
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
              data-cy="add-text-card"
              onClick={() =>
                dispatch({
                  type: "ADD_CARD",
                  columnId: column.id,
                  category: "text",
                  limit: limit,
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
              data-cy="add-pomodoro-card"
              onClick={() =>
                dispatch({
                  type: "ADD_CARD",
                  columnId: column.id,
                  category: "pomodoro",
                  limit: limit,
                  initialLength: sessionLength["work"],
                })
              }
              variant="contained"
            >
              <TimerIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete all cards inside " + column.title + " list?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete all cards inside{" "}
            {column.title} list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            aria-label="delete-all-cards-cancel"
            data-cy="delete-all-cards-cancel"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCards}
            color="primary"
            aria-label="delete-all-cards-confirm"
            data-cy="delete-all-cards-confirm"
          >
            Delete all cards
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
