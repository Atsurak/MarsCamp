import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles, MenuItem } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom'
import Announcement from './Anouncement'
import Material from './Material'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
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
        return <div>Test</div>
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
      <TextField
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
