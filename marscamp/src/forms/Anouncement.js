import React, { useState } from 'react';
import {Typography, TextField, Button, makeStyles} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 40,
    marginBottom: 20,
    display: 'block',
  }
})

export default function Announcement() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const type = 'announcement';
  const userToken = JSON.parse(localStorage.getItem('token'))[0];
  const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
  const course_id = userToken.course_id;
  const user_id = userToken.registration_no;

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    const content = details;

    if (title === '') {
      setTitleError(true)
    }
    if (details === '') {
      setDetailsError(true)
    }
    if (title && details) {
      fetch('http://localhost:5000/content/add', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, content, user_id, course_id, type})
      }).then(() => history.push('/'))
    } 
  }

  return (
    <div>
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
        
      >
    
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Title" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={titleError}
        />
        <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Message"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Post
        </Button>
      </form>
    </div>
  )
}
