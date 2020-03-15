import React, { useReducer, createContext } from "react";
import {
  deleteCardFunction,
  updateCardFunction,
  addCardFunction,
  moveCardFunction
} from "./BoardContextFunctions";
export const BoardContext = createContext();

const initialState = {
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
};

const reducer = (board, action) => {
  switch (action.type) {
    case "DELETE_CARD":
      return deleteCardFunction(board, action.cardId);
    case "UPDATE_CARD":
      return updateCardFunction(board, action.content, action.cardId);
    case "ADD_CARD":
      return addCardFunction(board, action.columnId);
    case "MOVE_CARD":
      return moveCardFunction(board, action.result);
    default:
      return board;
  }
};

export const BoardProvider = props => {
  const [board, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardContext.Provider value={[board, dispatch]}>
      {props.children}
    </BoardContext.Provider>
  );
};
