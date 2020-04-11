import React from "react";

import Board from "./Board";
import { BoardProvider } from "./BoardContext";
import NavBar from "./NavBar";

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
