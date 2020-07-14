import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

import { logout } from "../../apiUtils/authActions";
import SettingsModal from "./SettingsModal";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const { board, settings, dispatch } = props;

  const [open, setOpen] = useState(false); //for settings modal;
  const classes = useStyles();

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <SettingsModal
        open={open}
        handleModal={handleModal}
        board={board}
        settings={settings}
        dispatch={dispatch}
      />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Productive Corner
          </Typography>
          <Tooltip title="Settings">
            <IconButton name="settings" color="inherit" onClick={handleModal}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              onClick={logout}
              name="logout"
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
