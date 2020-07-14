import React, { useReducer, useEffect } from "react";
import {
  deleteCardFunction,
  deleteAllCardsFunction,
  updateCardFunction,
  addCardFunction,
  moveCardFunction,
} from "./BoardContextFunctions";
import { getBoard, updateBoard } from "../../apiUtils/boardActions";
import { getSettings, updateSettings } from "../../apiUtils/settingsActions";
import { useIsFirstRender } from "../../apiUtils/useIsFirstRender";

import Board from "./Board";
import NavBar from "./NavBar";

const initialBoard = {
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

const initialSettings = {
  listLimits: { backlog: 10, todo: 5, doing: 2, done: 10 },
  sessionLength: { work: 25, break: 5 },
};

const initialState = {
  board: initialBoard,
  settings: initialSettings,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CARD":
      return {
        ...state,
        board: deleteCardFunction(state["board"], action.cardId),
      };
    case "DELETE_ALL_CARDS":
      return {
        ...state,
        board: deleteAllCardsFunction(state["board"], action.columnId),
      };
    case "UPDATE_CARD":
      return {
        ...state,
        board: updateCardFunction(
          state["board"],
          action.content,
          action.cardId
        ),
      };
    case "ADD_CARD":
      return {
        ...state,
        board: addCardFunction(
          state["board"],
          action.columnId,
          action.category,
          action.limit,
          action.initialLength
        ),
      };
    case "MOVE_CARD":
      return {
        ...state,
        board: moveCardFunction(state["board"], action.result, action.limits),
      };
    case "UPDATE_BOARD":
      return { ...state, board: action.board };
    case "CHANGE_SETTINGS":
      return {
        ...state,
        settings: action.settings,
      };
    case "UPDATE_SETTINGS": // to update the settings with info from api
      return { ...state, settings: action.settings };
    default:
      return state;
  }
};

export default function BoardContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    async function fetchData() {
      const boardResponse = await getBoard();
      if (boardResponse)
        dispatch({ type: "UPDATE_BOARD", board: boardResponse });

      const settingsResponse = await getSettings();
      if (settingsResponse)
        dispatch({ type: "UPDATE_SETTINGS", settings: settingsResponse });
    }
    fetchData();
  }, []);

  //works as useEffect but only after the first render
  //using it to send updates to API every time board changes
  useEffect(() => {
    async function sendData() {
      await updateBoard(state["board"]);
    }

    if (!isFirstRender) sendData();
  }, [state["board"], isFirstRender]);

  useEffect(() => {
    async function sendData() {
      await updateSettings(state["settings"]);
    }

    if (!isFirstRender) sendData();
  }, [state["settings"], isFirstRender]);

  return (
    <div>
      <NavBar
        board={state["board"]}
        settings={state["settings"]}
        dispatch={dispatch}
      />
      <Board
        board={state["board"]}
        settings={state["settings"]}
        dispatch={dispatch}
      />
    </div>
  );
}
