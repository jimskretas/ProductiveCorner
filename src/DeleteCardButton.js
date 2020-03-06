import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { BoardContext } from "./BoardContext";

export default function DeleteCardButton(props) {
  const [state, setState] = useContext(BoardContext);

  function deleteCard(id) {
    let data = state.cards;

    delete data[id];
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
        data
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
      onClick={() => deleteCard(props.id)}
      style={{ backgroundColor: "transparent" }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
