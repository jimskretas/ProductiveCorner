import React from "react";
import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";

import { logout } from "../../apiUtils/authActions";
// import InfoModal from "./InfoModal";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  // const [open, setOpen] = useState(false) //for info modal;
  const classes = useStyles();

  // const handleModal = () => {
  //   setOpen(!open); // for info modal
  // };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Productive Corner
          </Typography>
          <IconButton color="inherit" disabled>
            <InfoIcon />
          </IconButton>
          {/* <InfoModal open={open} handleModal={handleModal} /> */}
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
