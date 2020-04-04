import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../../apiUtils/authActions";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Productive Corner
          </Typography>
          <Tooltip title="Productivity Tips">
            <IconButton color="inherit">
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              onClick={logout}
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
