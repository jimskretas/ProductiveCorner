import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextCard from "./TextCard";

import { Droppable } from "react-beautiful-dnd";

export default function TaskList(props) {
  return (
    <Card>
      <CardHeader title={props.column.title} />
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
