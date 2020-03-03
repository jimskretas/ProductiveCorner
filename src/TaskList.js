import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import TextCard from "./TextCard";

import { Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#EFEFF0",
    margin: theme.spacing(1)
  },
  cardTitle: {
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(1)
  }
}));

export default function TaskList(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={props.column.title} className={classes.cardTitle} />
      <Droppable droppableId={props.column.id}>
        {provided => (
          <CardContent ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map((task, index) => (
              <TextCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
      <CardActions />
    </Card>
  );
}
