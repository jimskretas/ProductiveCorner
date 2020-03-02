import React, { useState } from "react";
import ReactDOM from "react-dom";
import TaskList from "./TaskList";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
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

    const startColumn = state.columns[source.droppableId];
    const destColumn = state.columns[destination.droppableId];

    //Moving cards in the same list
    if (startColumn === destColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
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
      return;
    }

    //Moving from one list to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(destColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...destColumn,
      taskIds: finishTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
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
