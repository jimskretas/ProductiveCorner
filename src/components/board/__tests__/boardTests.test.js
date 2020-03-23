import React from "react";
import { createMount } from "@material-ui/core/test-utils";
import Board from "../Board";
import { BoardProvider } from "../BoardContext";
import { render, cleanup, fireEvent } from "@testing-library/react";

function renderBoard() {
  return render(
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}

describe("Board Integration Tests", () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
    cleanup();
  });

  it("Should render cards", () => {
    const { getAllByDisplayValue } = renderBoard();
    expect(getAllByDisplayValue("Charge phone").length).toBe(1);
  });

  it("Should add a card", () => {
    const { getAllByDisplayValue, getAllByRole } = renderBoard();

    const addCardButton = getAllByRole("button", { name: "Add Card" });
    fireEvent.click(addCardButton[0]);

    expect(getAllByDisplayValue("").length).toBe(1);
  });
});
