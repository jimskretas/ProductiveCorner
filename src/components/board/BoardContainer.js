import React, { useReducer, useEffect } from "react";
import {
  deleteCardFunction,
  deleteAllCardsFunction,
  updateCardFunction,
  addCardFunction,
  moveCardFunction,
} from "./BoardContextFunctions";
import { getBoard, updateBoard } from "../../apiUtils/boardActions";
import { useIsFirstRender } from "../../apiUtils/useIsFirstRender";

import Board from "./Board";

const initialState = {
  cards: {
    card0: { id: "card0", content: "" },
  },
  columns: {
    backlog: {
      id: "backlog",
      title: "Backlog",
      cardIds: [],
    },
    todo: {
      id: "todo",
      title: "To do",
      cardIds: [],
    },
    doing: {
      id: "doing",
      title: "Doing",
      cardIds: [],
    },
    done: {
      id: "done",
      title: "Done",
      cardIds: [],
    },
  },
  columnOrder: ["backlog", "todo", "doing", "done"],
  cardNumber: 0,
};

const reducer = (board, action) => {
  switch (action.type) {
    case "DELETE_CARD":
      return deleteCardFunction(board, action.cardId);
    case "DELETE_ALL_CARDS":
      return deleteAllCardsFunction(board, action.columnId);
    case "UPDATE_CARD":
      return updateCardFunction(board, action.content, action.cardId);
    case "ADD_CARD":
      return addCardFunction(board, action.columnId, action.category);
    case "MOVE_CARD":
      return moveCardFunction(board, action.result);
    case "UPDATE_BOARD":
      return action.board;
    default:
      return board;
  }
};

export default function BoardContainer() {
  const [board, dispatch] = useReducer(reducer, initialState);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    async function fetchData() {
      const response = await getBoard();
      // console.log(response);
      if (response) dispatch({ type: "UPDATE_BOARD", board: response });
    }
    fetchData();
  }, []);

  //works as useEffect but only after the first render
  //using it to send updates to API every time board changes
  useEffect(() => {
    async function sendData() {
      await updateBoard(board);
      // const response = await updateBoard(board);
      // console.log(response);
    }

    if (!isFirstRender) sendData();
  }, [board, isFirstRender]);

  return <Board board={board} dispatch={dispatch} />;
}
