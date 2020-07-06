import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import CardList from "./CardList";

export default function Board(props) {
  const { board, dispatch } = props;

  return (
    <div style={{ display: "flex", overflowx: "auto" }}>
      <DragDropContext
        onDragEnd={(result) => dispatch({ type: "MOVE_CARD", result: result })}
      >
        {board.columnOrder.map((columnId) => {
          const column = board.columns[columnId];
          const cards = column.cardIds.map((cardId) => board.cards[cardId]);

          return (
            <CardList
              key={column.id}
              column={column}
              cards={cards}
              dispatch={dispatch}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
}
