import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextCard from "./TextCard";
import AddIcon from "@material-ui/icons/Add";
import { Droppable } from "react-beautiful-dnd";
import { BoardContext } from "./BoardContext";

const useStyles = makeStyles(theme => ({
  column: {
    backgroundColor: "#EFEFF0",
    margin: theme.spacing(1),
    width: "350px"
  },
  columnTitle: {
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(1)
  },
  addButton: {
    backgroundColor: "#EFEFF0"
  }
}));

export default function CardList(props) {
  const { column, cards } = props;
  const classes = useStyles();
  const [board, dispatch] = useContext(BoardContext);

  return (
    <Grid item>
      <Card className={classes.column}>
        <CardHeader title={column.title} className={classes.columnTitle} />
        <Droppable droppableId={column.id}>
          {provided => (
            <CardContent ref={provided.innerRef} {...provided.droppableProps}>
              {cards.map((card, index) => (
                <TextCard key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </CardContent>
          )}
        </Droppable>
        <CardActions>
          <Button
            data-test="buttonComponent"
            className={classes.addButton}
            onClick={() => dispatch({ type: "ADD_CARD", columnId: column.id })}
            disableElevation
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Card
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
