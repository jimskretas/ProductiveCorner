import React from "react";
import Board from "./Board";
import NavBar from "./NavBar";
import { BoardProvider } from "./BoardContext";

export default function AppPage() {
  return (
    <div>
      <NavBar />
      <BoardProvider>
        <Board />
      </BoardProvider>
    </div>
  );
}
