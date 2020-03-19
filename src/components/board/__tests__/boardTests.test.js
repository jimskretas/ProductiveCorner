// import React from "react";
// import { createMount } from "@material-ui/core/test-utils";
// import Board from "../Board";
// import { BoardProvider } from "../BoardContext";
// import { render } from "@testing-library/react";

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
//   });

//   it("Should render cards correctly", () => {
//     const { getByText } = renderBoard();
//     expect(getByText("Charge phone")).toBe(1);
//   });
// });
