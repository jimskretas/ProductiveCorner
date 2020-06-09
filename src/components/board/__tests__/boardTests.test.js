// import React from "react";
// import { createMount } from "@material-ui/core/test-utils";
// import Board from "../Board";
// import { BoardProvider } from "../BoardContext";
// import { render, cleanup, fireEvent } from "@testing-library/react";

// function renderBoard() {
//   return render(
//     <BoardProvider>
//       <Board />
//     </BoardProvider>
//   );
// }

// describe("Board Integration Tests", () => {
//   let mount;

//   beforeEach(() => {
//     mount = createMount();
//   });

//   afterEach(() => {
//     mount.cleanUp();
//     cleanup();
//   });

//   // it("Should render cards", () => {
//   //   const { getAllByDisplayValue } = renderBoard();
//   //   expect(getAllByDisplayValue("Learn React").length).toBe(1);
//   // });

//   // it("Should add a card", () => {
//   //   const { getAllByDisplayValue, getAllByRole } = renderBoard();

//   //   let addCardButton = getAllByRole("button", { name: "Add Card" })[0];
//   //   const cardCount = getAllByRole("button", { name: "delete-card" }).length;
//   //   fireEvent.click(addCardButton);
//   //   const newCardCount = getAllByRole("button", { name: "delete-card" }).length;

//   //   expect(getAllByDisplayValue("").length).toBe(1);
//   //   expect(newCardCount).toBe(cardCount + 1);
//   // });

//   // it("Should delete a card", () => {
//   //   const { getAllByRole } = renderBoard();

//   //   let deleteCardButtons = getAllByRole("button", { name: "delete-card" });
//   //   const cardCount = deleteCardButtons.length;
//   //   fireEvent.click(deleteCardButtons[0]);
//   //   deleteCardButtons = getAllByRole("button", { name: "delete-card" });

//   //   expect(deleteCardButtons.length).toBe(cardCount - 1);
//   // });
// });
