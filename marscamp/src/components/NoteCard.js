import React, { useState } from 'react';
import {Card, CardHeader, CardContent, IconButton, Typography, Button, makeStyles, Menu, Avatar} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { yellow, green, pink, blue} from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Action from './Action';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.difficulty === 'intermediate') {
        return blue[500]
      }
      if (note.difficulty === 'beginner') {
        return green[500]
      }
      if (note.difficulty === 'expert') {
        return yellow[700]
      }
      return pink[500]
    },
  }
})

export default function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const userToken = JSON.parse(localStorage.getItem('token'));
  const utype = userToken[0].user_type === 'STUDENT'? 0 : (userToken[0].user_type==='FACULTY'? 1 : -1 );
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  let userCourses = [];
  if(utype===0){
    userCourses += userToken[1];
  }
  else if(utype===1){
    userCourses += userToken[0].course_id;
  }

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleCourseClick = (id) => {
    if(userCourses.includes(id)||utype===1||utype===-1){
      history.push({
      pathname : '/course',
      state : {id:id}
    })
    }
    else{
      setOpen(true);
    }
    
  }

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.course_title[0].toUpperCase()}
            </Avatar>}
          action={
            <div>
          <IconButton aria-controls="user-actions" aria-haspopup="true" onClick={handleClick} >
            <MoreVertIcon />      
          </IconButton>
          <Menu
              id="user-actions"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Action utype={utype} note={note} handleClose={handleClose}/>
            </Menu>
            </div>
          }
          title={note.course_title}
          // subheader={note.category}
        />
        <CardContent onClick={()=>{handleCourseClick(note.course_id)}}>
            <Typography variant="body2" color="textSecondary">
            { note.course_desc}
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"You are not Enrolled in this Course"}</DialogTitle>
         <DialogContent>
          <DialogContentText>
             You must be Enrolled as a student of this Course to view the content of this Course.
          </DialogContentText>
         </DialogContent>
        <DialogActions>
          <Button className={classes.red} autoFocus onClick={handleDialogClose} color="secondary">
            Dismiss
          </Button>
          <Button className={classes.green} onClick={handleDialogClose} color="secondary" autoFocus>
            Enroll Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}