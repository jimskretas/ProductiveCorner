import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import "./TextCard.css";

import { Draggable } from "react-beautiful-dnd";

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

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
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
              <Grid item xs={8}>
                <InputBase
                  className={classes.margin}
                  multiline
                  fullWidth
                  defaultValue={props.task.content}
                />
              </Grid>
              <Grid item xs={2} className="trashButton">
                <IconButton
                  aria-label="delete"
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
