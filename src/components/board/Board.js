import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { BoardContext } from "./BoardContext";
import CardList from "./CardList";

export default function Board() {
  const [board, dispatch] = useContext(BoardContext);
  // console.log(board);

  return (
    <div style={{ display: "flex", overflowx: "auto" }}>
      <DragDropContext
        onDragEnd={(result) => dispatch({ type: "MOVE_CARD", result: result })}
      >
        {board.columnOrder.map((columnId) => {
          const column = board.columns[columnId];
          const cards = column.cardIds.map((cardId) => board.cards[cardId]);

          return <CardList key={column.id} column={column} cards={cards} />;
        })}
      </DragDropContext>
    </div>
  );
}
