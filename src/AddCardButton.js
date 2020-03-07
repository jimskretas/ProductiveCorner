import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { BoardContext } from "./BoardContext";

const useStyles = makeStyles(theme => ({
  addButton: {
    backgroundColor: "#EFEFF0"
  }
}));

export default function AddCardButton(props) {
  const [state, setState] = useContext(BoardContext);
  const classes = useStyles();

  function addCard(colId) {
    let newCardNumber = state.cardNumber + 1;
    const id = "card" + newCardNumber;

    // Add new card at the end of cards
    let newCards = state.cards;
    newCards[id] = { id: id, content: "" };

    // Add the cardId at the end of cardIds in the props.colId column
    let newColumns = state.columns;
    newColumns[colId].cardIds.push(id);

    let newState = {
      ...state,
      cards: newCards,
      columns: newColumns,
      cardNumber: newCardNumber
    };
    setState(newState);
  }

  return (
    <Button
      className={classes.addButton}
      onClick={() => addCard(props.id)}
      disableElevation
      fullWidth
      variant="contained"
      startIcon={<AddIcon />}
    >
      Add Card
    </Button>
  );
}
