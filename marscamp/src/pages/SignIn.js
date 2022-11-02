import React, { useState } from 'react';
import { makeStyles, Typography, Avatar, Button, CssBaseline, TextField, Checkbox, Link, Grid, Box, Container, FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import Copyright from '../components/Copyright';
import { useHistory } from 'react-router';

const loginUser = async (credentials) => {
  // eslint-disable-next-line
  const req = 'http://localhost:5000/auth/login?' + 'email=' + credentials.email + '&pwd=' + credentials.password;
  console.log(req);
  return await fetch(req)
    .then(data => data.json()).catch(err => {
      console.log("Failed to Get User Info");
    })
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ setToken }) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    await loginUser({
      email,
      password
    }).then(data => {
      if (data && data !== "undefined") setToken(data)
    });
    history.push('/');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar src="/mars.png" className={classes.avatar} />
        {/* <LockOutlinedIcon /> */}

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            color="secondary"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="secondary">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" color="secondary">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired
}