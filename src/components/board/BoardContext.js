import React, { useState, createContext } from "react";

export const BoardContext = createContext();

export const BoardProvider = props => {
  const [board, setBoard] = useState({
    cards: {
      card1: { id: "card1", content: "Take out the garbage" },
      card2: { id: "card2", content: "Watch para 5" },
      card3: { id: "card3", content: "Charge phone" },
      card4: { id: "card4", content: "Cook dinner" }
    },
    columns: {
      backlog: {
        id: "backlog",
        title: "Backlog",
        cardIds: []
      },
      todo: {
        id: "todo",
        title: "To do",
        cardIds: ["card1", "card2"]
      },
      doing: {
        id: "doing",
        title: "Doing",
        cardIds: ["card3"]
      },
      done: {
        id: "done",
        title: "Done",
        cardIds: ["card4"]
      }
    },
    columnOrder: ["backlog", "todo", "doing", "done"],
    cardNumber: 4
  });

  return (
    <BoardContext.Provider value={[board, setBoard]}>
      {props.children}
    </BoardContext.Provider>
  );
};
