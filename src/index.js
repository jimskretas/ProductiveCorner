import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import { BoardProvider } from "./BoardContext";

export default function App() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
