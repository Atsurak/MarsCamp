import React, { useState } from 'react';
import {} from '@material-ui/core';
import {Avatar, TextField, FormControlLabel, Button, FormControl, FormLabel, RadioGroup, Radio, Link, Grid, Box, Typography, makeStyles, Container}from '@material-ui/core';
import Copyright from '../components/Copyright'
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regno,setRegNo] = useState('');
  const [mobno,setMobNo] = useState('');
  const [type,setType] = useState('STUDENT');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Added new user');
    const Name = firstName + ' ' + lastName;

    if (Name && email && password) {
      fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ reg_no:regno,ph_no:mobno,email:email,name:Name,user_type:type,pwd:password})
      }).then(data => {
        data.json();
        console.log(data);
      })
      .then(() => history.push('/'))
      .catch(err=>{console.log(err)})
    } 
  }

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar src="/mars.png" className={classes.avatar}/>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                color="secondary"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                color="secondary"
                onChange={(e) => setLastName(e.target.value)}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reg_no"
                label="Enrollment / Registration No"
                name="reg_no"
                autoComplete="off"
                color="secondary"
                onChange={(e) => setRegNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                color="secondary"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                color="secondary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ph_no"
                label="Contact No"
                name="mobno"
                autoComplete="off"
                color="secondary"
                onChange={(e) => setMobNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl color="secondary">
              <FormLabel>I am a </FormLabel>
                <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
                    <FormControlLabel value="STUDENT" control={<Radio />} label="Student" />
                    <FormControlLabel value="FACULTY" control={<Radio />} label="Faculty" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2" color="secondary">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}