import React from "react";
//import { createMount } from "@material-ui/core/test-utils";
import Board from "../Board";
import { BoardProvider } from "../BoardContext";
import { render, cleanup } from "@testing-library/react";

function renderBoard() {
  return render(
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}

describe("Board Integration Tests", () => {
  //let mount;

  beforeEach(() => {
    //mount = createMount();
  });

  afterEach(() => {
    //mount.cleanUp();
    cleanup();
  });

  it("Should render cards correctly", () => {
    const { getAllByDisplayValue } = renderBoard();
    expect(getAllByDisplayValue("Charge phone").length).toBe(1);
  });
});
