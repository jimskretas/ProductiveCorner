import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { BoardContext } from "./BoardContext";

export default function DeleteCardButton(props) {
  const { id } = props;
  const [state, setState] = useContext(BoardContext);

  function deleteCard(id) {
    let cards = state.cards;

    delete cards[id];
    let columns = state.columns;
    for (let column in columns) {
      let cardIndex = columns[column].cardIds.indexOf(id);
      if (cardIndex >= 0) {
        columns[column].cardIds.splice(cardIndex, 1);
        break;
      }
    }
    let newState = {
      cards: {
        cards
      },
      columns: {
        columns
      },
      ...state
    };

    setState(newState);
  }

  return (
    <IconButton
      aria-label="delete"
      onClick={() => deleteCard(id)}
      style={{ backgroundColor: "transparent" }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
