import React, { useState } from "react";
import ReactDOM from "react-dom";
import TaskList from "./TaskList";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  //state = initialData;
  const [state, setState] = useState(initialData);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    };

    setState(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

        return <TaskList key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
