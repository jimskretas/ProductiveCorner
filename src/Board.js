import React, { useContext } from "react";
import CardList from "./CardList";
import { DragDropContext } from "react-beautiful-dnd";
import { BoardContext } from "./BoardContext";

export default function Board() {
  const [state, setState] = useContext(BoardContext);

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
      const newCardIds = Array.from(startColumn.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        cardIds: newCardIds
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
    const startCardIds = Array.from(startColumn.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      cardIds: startCardIds
    };

    const finishCardIds = Array.from(destColumn.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...destColumn,
      cardIds: finishCardIds
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
        const cards = column.cardIds.map(cardId => state.cards[cardId]);

        return <CardList key={column.id} column={column} cards={cards} />;
      })}
    </DragDropContext>
  );
}
