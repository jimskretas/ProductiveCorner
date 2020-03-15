import React from "react";
import ReactDOM from "react-dom";
import Board from "./components/board/Board";
import NavBar from "./components/navbar/NavBar";
import { BoardProvider } from "./components/board/BoardContext";

export default function App() {
  return (
    <div>
      <NavBar />
      <BoardProvider>
        <Board />
      </BoardProvider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
