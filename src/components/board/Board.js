import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import CardList from "./CardList";

export default function Board(props) {
  const { board, settings, dispatch } = props;

  return (
    <div style={{ display: "flex", overflowx: "auto" }}>
      <DragDropContext
        onDragEnd={(result) =>
          dispatch({
            type: "MOVE_CARD",
            result: result,
            limits: settings["listLimits"],
          })
        }
      >
        {board.columnOrder.map((columnId) => {
          const column = board.columns[columnId];
          const cards = column.cardIds.map((cardId) => board.cards[cardId]);
          // console.log(cards);
          return (
            <CardList
              key={column.id}
              column={column}
              cards={cards}
              sessionLength={settings["sessionLength"]}
              limit={settings["listLimits"][columnId]}
              dispatch={dispatch}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
}
