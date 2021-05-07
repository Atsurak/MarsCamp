import React, { useState } from 'react';
import {Typography, Button, makeStyles, TextField} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles({
  field: {
    marginTop: 40,
    marginBottom: 20,
    display: 'block',
  },
  input :{
      display :'none'
  },
  sub :{
      marginTop : 20
  }
  
})

export default function Material() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [file_path, setFilepath] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const type = 'material';
  const userToken = JSON.parse(localStorage.getItem('token'))[0];
  //const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
  const course_id = userToken.course_id;
  const user_id = userToken.registration_no;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false)
    setDetailsError(false)
    console.log(file_path);
    file_path.substring(12);

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
         body: JSON.stringify({ content : details, user_id, course_id,title, type, file_path })
      })
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

        <input
        accept="application/zip"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => setFilepath(e.target.value)}
        />
       <label htmlFor="contained-button-file">
        <Button
         variant="outlined" 
         color="secondary"
         component="span"
         startIcon={<CloudUploadIcon/>}
        >
          Upload Material
        </Button>
       </label>
       <div>
        <Button className={classes.sub}
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Post
        </Button>
       </div>
        
      </form>

      
    </div>
  )
}














