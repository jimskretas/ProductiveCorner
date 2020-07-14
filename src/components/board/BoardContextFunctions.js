export function deleteCardFunction(board, cardId) {
  let cards = board.cards;
  delete cards[cardId];
  let columns = board.columns;
  for (let column in columns) {
    let cardIndex = columns[column].cardIds.indexOf(cardId);
    //indexOf returns -1 in case it didn't find it
    if (cardIndex >= 0) {
      columns[column].cardIds.splice(cardIndex, 1);
      break;
    }
  }

  let newState = {
    cards: {
      cards,
    },
    columns: {
      columns,
    },
    ...board,
  };

  return newState;
}

export function addCardFunction(
  board,
  colId,
  category = "text",
  limit,
  initialLength = 25
) {
  // check if there is space for a new card
  if (board.columns[colId].cardIds.length >= limit) return board;
  if (typeof initialLength === "undefined") initialLength = 25;

  let newCardNumber = board.cardNumber + 1;
  const id = "card" + newCardNumber;

  // Add a new card
  let newCards = board.cards;

  if (category === "text")
    newCards[id] = { id: id, content: "", category: category };
  else if (category === "pomodoro")
    newCards[id] = { id: id, content: initialLength * 60, category: category };

  // Add the cardId at the end of cardIds in the props.colId column
  let newColumns = board.columns;
  newColumns[colId].cardIds.push(id);
  let newState = {
    ...board,
    cards: newCards,
    columns: newColumns,
    cardNumber: newCardNumber,
  };

  return newState;
}

export function moveCardFunction(board, result, listLimits) {
  // console.log(result);
  const { destination, source, draggableId } = result;

  // check if there is space for a new card
  if (
    board.columns[destination.droppableId].cardIds.length >=
    listLimits[destination.droppableId]
  )
    return board;

  if (!destination) return board;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return board;
  }

  const startColumn = board.columns[source.droppableId];
  const destColumn = board.columns[destination.droppableId];

  //Moving cards in the same list
  if (startColumn === destColumn) {
    const newCardIds = Array.from(startColumn.cardIds);
    newCardIds.splice(source.index, 1);
    newCardIds.splice(destination.index, 0, draggableId);

    const newState = {
      ...board,
      columns: {
        ...board.columns,
        [startColumn.id]: {
          ...startColumn,
          cardIds: newCardIds,
        },
      },
    };

    return newState;
  }

  //Moving from one list to another
  const startCardIds = Array.from(startColumn.cardIds);
  startCardIds.splice(source.index, 1);

  const finishCardIds = Array.from(destColumn.cardIds);
  finishCardIds.splice(destination.index, 0, draggableId);

  const newState = {
    ...board,
    columns: {
      ...board.columns,
      [startColumn.id]: {
        ...startColumn,
        cardIds: startCardIds,
      },
      [destColumn.id]: {
        ...destColumn,
        cardIds: finishCardIds,
      },
    },
  };

  return newState;
}

export function updateCardFunction(board, currContent, id) {
  let newCards = board.cards;
  let oldStateContent = newCards[id].content;
  // Update state with the new card content if it changed
  if (oldStateContent !== currContent) {
    newCards[id] = { ...newCards[id], content: currContent };
    let newState = {
      ...board,
      cards: newCards,
    };

    return newState;
  }

  //if content hasn't changed
  return board;
}

export function deleteAllCardsFunction(board, colId) {
  let cardsToDelete = [...board.columns[colId].cardIds];
  let newBoard = JSON.parse(JSON.stringify(board)); //deep copy

  cardsToDelete.forEach((cardId) => {
    deleteCardFunction(newBoard, cardId);
  });

  return newBoard;
}
