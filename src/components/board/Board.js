import React, { useContext } from "react";
import CardList from "./CardList";
import { DragDropContext } from "react-beautiful-dnd";
import { BoardContext } from "./BoardContext";

export default function Board() {
  const [board, dispatch] = useContext(BoardContext);

  return (
    <div style={{ display: "flex", overflowx: "auto" }}>
      <DragDropContext
        onDragEnd={result => dispatch({ type: "MOVE_CARD", result: result })}
      >
        {board.columnOrder.map(columnId => {
          const column = board.columns[columnId];
          const cards = column.cardIds.map(cardId => board.cards[cardId]);

          return <CardList key={column.id} column={column} cards={cards} />;
        })}
      </DragDropContext>
    </div>
  );
}
