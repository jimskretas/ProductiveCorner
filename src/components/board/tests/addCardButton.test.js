// import React from "react";
// import { createMount } from "@material-ui/core/test-utils";
// import AddCardButton from "../AddCardButton";
// import { BoardContext } from "../BoardContext";
// import { render } from "@testing-library/react";

// const state = {
//   cards: {
//     card1: { id: "card1", content: "Take out the garbage" },
//     card2: { id: "card2", content: "Watch para 5" },
//     card3: { id: "card3", content: "Charge phone" },
//     card4: { id: "card4", content: "Cook dinner" }
//   },
//   columns: {
//     backlog: {
//       id: "backlog",
//       title: "Backlog",
//       cardIds: []
//     },
//     todo: {
//       id: "todo",
//       title: "To do",
//       cardIds: ["card1", "card2"]
//     },
//     doing: {
//       id: "doing",
//       title: "Doing",
//       cardIds: ["card3"]
//     },
//     done: {
//       id: "done",
//       title: "Done",
//       cardIds: ["card4"]
//     }
//   },
//   columnOrder: ["backlog", "todo", "doing", "done"],
//   cardNumber: 4
// };

// function renderAddCardButton(state) {
//   return render(
//     <BoardContext.Provider value={state}>
//       <AddCardButton cardId="card1" />
//     </BoardContext.Provider>
//   );
// }

// describe("AddCardButton Component", () => {
//   let mount;

//   beforeEach(() => {
//     mount = createMount();
//   });

//   afterEach(() => {
//     mount.cleanUp();
//   });

//   it("Should render without errors", () => {
//     const wrapper = renderAddCardButton(state);
//     expect(wrapper.length).toBe(1);
//   });
// });
