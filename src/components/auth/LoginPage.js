import React, { useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { login } from "../../apiUtils/authActions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function LoginPage() {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSubmit = e => {
    if (e) e.preventDefault();
    login({ username: username, password: password }).then(status => {
      status === 1 ? setRedirect(true) : setError(status);
    });
    setPassword("");
  };

  return (
    <div>
      {redirect ? <Redirect to="/" /> : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Typography component="h2" variant="subtitle1">
            {error !== null ? "* " + error : null}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              onChange={e => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              onChange={e => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
