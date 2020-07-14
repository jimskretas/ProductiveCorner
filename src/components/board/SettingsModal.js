import React, { useState } from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    margin: theme.spacing(2, "auto"),
    padding: theme.spacing(2, 4),
    borderRadius: 5,
  },
  title: {
    padding: theme.spacing(0),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Segoe UI",
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  buttonArea: {
    marginTop: theme.spacing(2),
  },
}));

export default function SettingsModal(props) {
  const { open, handleModal, board, settings, dispatch } = props;
  const [settingsContent, setSettingsContent] = useState(settings);
  const [edited, setEdited] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    handleModal();
  };

  function handleChange(e, type) {
    setEdited(true);
    const name = e.target.name;
    let value = isNaN(e.target.value) ? 1 : parseInt(e.target.value, 10);

    if (value < 1) value = 1;
    if (type === "listLimits") {
      let currentListCards = board["columns"][name]["cardIds"].length;
      if (value < currentListCards) value = currentListCards;
    }

    setSettingsContent({
      ...settingsContent,
      [type]: { ...settingsContent[type], [name]: value },
    });
  }

  function handleSave() {
    setEdited(false);
    dispatch({
      type: "CHANGE_SETTINGS",
      settings: settingsContent,
    });
    handleClose();
  }

  function handleRestoreDefaults() {
    const initialSettings = {
      listLimits: { backlog: 10, todo: 5, doing: 2, done: 10 },
      sessionLength: { work: 25, break: 5 },
    };

    setEdited(false);
    setSettingsContent(initialSettings);
    dispatch({
      type: "CHANGE_SETTINGS",
      settings: initialSettings,
    });
    handleClose();
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Container className={classes.paper} maxWidth="sm" margin="auto">
          <Grid container spacing={2} margin={5}>
            <Grid item sm={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h2 className={classes.title} id="list-limit-title">
                    List Limits
                  </h2>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="backlog"
                    label="Backlog"
                    value={parseInt(
                      settingsContent["listLimits"]["backlog"],
                      10
                    )}
                    onChange={(e) => handleChange(e, "listLimits")}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="todo"
                    label="To Do"
                    value={parseInt(settingsContent["listLimits"]["todo"], 10)}
                    onChange={(e) => handleChange(e, "listLimits")}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="doing"
                    label="Doing"
                    value={parseInt(settingsContent["listLimits"]["doing"], 10)}
                    onChange={(e) => handleChange(e, "listLimits")}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="done"
                    label="Done"
                    value={parseInt(settingsContent["listLimits"]["done"], 10)}
                    onChange={(e) => handleChange(e, "listLimits")}
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h2 className={classes.title} id="session-length-title">
                    Session Lengths
                  </h2>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="work"
                    label="Work Length(minutes)"
                    value={parseInt(
                      settingsContent["sessionLength"]["work"],
                      10
                    )}
                    onChange={(e) => handleChange(e, "sessionLength")}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="break"
                    label="Break Length(minutes)"
                    value={parseInt(
                      settingsContent["sessionLength"]["break"],
                      10
                    )}
                    onChange={(e) => handleChange(e, "sessionLength")}
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.buttonArea}>
            <Grid item xs={6}>
              <Button
                name="cancel"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setSettingsContent(settings);
                  setEdited(false);
                  handleClose();
                }}
                fullWidth={true}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                name="save"
                variant="contained"
                color="primary"
                disabled={!edited}
                onClick={() => handleSave()}
                startIcon={<SaveIcon />}
                fullWidth={true}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                name="restoreDefaults"
                variant="outlined"
                color="primary"
                onClick={() => handleRestoreDefaults()}
                fullWidth={true}
              >
                Restore Defaults
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </Modal>
  );
}
