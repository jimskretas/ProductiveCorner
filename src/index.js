import React from "react";
import ReactDOM from "react-dom";
import Board from "./components/board/Board";
import { BoardProvider } from "./components/board/BoardContext";

export default function App() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
