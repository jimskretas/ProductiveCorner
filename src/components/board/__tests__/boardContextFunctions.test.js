import {
  deleteCardFunction,
  updateCardFunction,
  addCardFunction,
  moveCardFunction
} from "../BoardContextFunctions";

let state;
beforeEach(() => {
  state = {
    cards: {
      card1: { id: "card1", content: "Take out the garbage" },
      card2: { id: "card2", content: "Watch para 5" },
      card3: { id: "card3", content: "Charge phone" },
      card4: { id: "card4", content: "Cook dinner" }
    },
    columns: {
      backlog: {
        id: "backlog",
        title: "Backlog",
        cardIds: []
      },
      todo: {
        id: "todo",
        title: "To do",
        cardIds: ["card1", "card2"]
      },
      doing: {
        id: "doing",
        title: "Doing",
        cardIds: ["card3"]
      },
      done: {
        id: "done",
        title: "Done",
        cardIds: ["card4"]
      }
    },
    columnOrder: ["backlog", "todo", "doing", "done"],
    cardNumber: 4
  };
});

it("Should be able to delete the card", function() {
  let cardId = "card4";
  let targetState = {
    cards: {
      card1: { id: "card1", content: "Take out the garbage" },
      card2: { id: "card2", content: "Watch para 5" },
      card3: { id: "card3", content: "Charge phone" }
    },
    columns: {
      backlog: {
        id: "backlog",
        title: "Backlog",
        cardIds: []
      },
      todo: {
        id: "todo",
        title: "To do",
        cardIds: ["card1", "card2"]
      },
      doing: {
        id: "doing",
        title: "Doing",
        cardIds: ["card3"]
      },
      done: {
        id: "done",
        title: "Done",
        cardIds: []
      }
    },
    columnOrder: ["backlog", "todo", "doing", "done"],
    cardNumber: 4
  };
  expect(deleteCardFunction(state, cardId)).toEqual(targetState);
});

it("Should be able to add a card", function() {
  let columnId = "todo";
  let targetState = {
    cards: {
      card1: { id: "card1", content: "Take out the garbage" },
      card2: { id: "card2", content: "Watch para 5" },
      card3: { id: "card3", content: "Charge phone" },
      card4: { id: "card4", content: "Cook dinner" },
      card5: { id: "card5", content: "" }
    },
    columns: {
      backlog: {
        id: "backlog",
        title: "Backlog",
        cardIds: []
      },
      todo: {
        id: "todo",
        title: "To do",
        cardIds: ["card1", "card2", "card5"]
      },
      doing: {
        id: "doing",
        title: "Doing",
        cardIds: ["card3"]
      },
      done: {
        id: "done",
        title: "Done",
        cardIds: ["card4"]
      }
    },
    columnOrder: ["backlog", "todo", "doing", "done"],
    cardNumber: 5
  };
  expect(addCardFunction(state, columnId)).toEqual(targetState);
});

it("Should be able to update state with new card's content", function() {
  let cardId = "card1";
  let content = "Hello";
  let targetState = {
    cards: {
      card1: { id: "card1", content: "Hello" },
      card2: { id: "card2", content: "Watch para 5" },
      card3: { id: "card3", content: "Charge phone" },
      card4: { id: "card4", content: "Cook dinner" }
    },
    columns: {
      backlog: {
        id: "backlog",
        title: "Backlog",
        cardIds: []
      },
      todo: {
        id: "todo",
        title: "To do",
        cardIds: ["card1", "card2"]
      },
      doing: {
        id: "doing",
        title: "Doing",
        cardIds: ["card3"]
      },
      done: {
        id: "done",
        title: "Done",
        cardIds: ["card4"]
      }
    },
    columnOrder: ["backlog", "todo", "doing", "done"],
    cardNumber: 4
  };
  expect(updateCardFunction(state, content, cardId)).toEqual(targetState);
});

it("Should not change state, content hasn't changed", function() {
  let cardId = "card1";
  let content = "Take out the garbage";

  expect(updateCardFunction(state, content, cardId)).toEqual(state);
});

// it("Should move card in the same list", function() {
//   let result = {};
//   let targetState = {};
//   expect(updateCardFunction(state, result)).toEqual(state);
// });