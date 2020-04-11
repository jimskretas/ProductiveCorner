import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(2, 4, 3)
  }
}));

export default function InfoModal(props) {
  const { open, handleModal } = props;
  const classes = useStyles();

  const handleClose = () => {
    handleModal();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Productivity Tips</h2>
          <p id="transition-modal-description">
            5 second rule, start with something easy to gain momentum, eliminate
            distractions by disabling mobile notifications or blocking sites
            using an add-on.
          </p>
        </div>
      </Fade>
    </Modal>
  );
}
