import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import "./TextCard.css";

import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 5,
    paddingRight: 5
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function TextCard(props) {
  const classes = useStyles();

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {provided => (
        <div
          className="cardContainer"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className={classes.root}>
            <Grid container spacing={0}>
              <Grid item xs={10}>
                <InputBase
                  className={classes.margin}
                  multiline
                  fullWidth
                  defaultValue={props.task.content}
                />
              </Grid>
              <Grid item xs={2} className="trashButton">
                <IconButton aria-label="delete">
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
