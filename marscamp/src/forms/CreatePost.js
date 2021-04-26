import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Announcement from './Anouncement';
import Material from './Material';
import Test from './Test';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 40,
    display: 'block'
  },
  form:{
      margin : 0
  }
})

export default function CreatePost(){
  const classes = useStyles();
  const [type,setType] = useState('announcement');
  const handleChange = (e)=>{
      setType(e.target.value);
      console.log('option changed to'+`${e.target.value}`);
  }
  const ChangePostType = (type) =>{
      if(type==='announcement'){
          return <Announcement/>
      }
      else if(type==='test'){
        return <Test/>
      }
      else{
        return <Material/>
      }
  }
  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Post
      </Typography>
      <TextField className = {classes.field}
      id ="type"
      select
      fullWidth
      required
      color="secondary"
      label = "choose post type"
      onChange = {handleChange}
      >
          <MenuItem value = 'choose'>Choose </MenuItem>
          <MenuItem value = 'announcement'>Announcement</MenuItem>
          <MenuItem value = 'material'>Material</MenuItem>
          <MenuItem value = 'test'>Test</MenuItem>
      </TextField>
      <div
      >
          {ChangePostType(type)}
      </div>
    </Container>
  )
}
