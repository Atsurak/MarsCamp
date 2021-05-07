import React, { useEffect, useState } from 'react';
import { Container, useMediaQuery, useTheme ,makeStyles, Avatar, List, ListItem, ListItemAvatar, ListItemText, MenuItem, TextField, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ForumPost from '../forms/ForumPost';
import {formatDistanceToNowStrict} from 'date-fns';
const useStyles = makeStyles(() => ({
  heading : {
    marginTop : 20,
    paddingTop : 20,
    color : '#dd5692'
  },
  avatar : {
    backgroundColor : '#dd5692'
  }
}));

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [courses,setCourses] = useState([]);
  const [forum,setForum] = useState(0);
  const userToken = JSON.parse(localStorage.getItem('token'));
  const utype = userToken[0].user_type === 'STUDENT'? 0 : (userToken[0].user_type==='FACULTY'? 1 : -1 );
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  let userCourses = [];
  if(utype===0){
    userCourses += userToken[1];
    userCourses = userCourses.split(',').map(Number);
  }
  else if(utype===1){
    userCourses += userToken[0].course_id;
    userCourses = userCourses.split(',').map(Number);
  }
  else{
    userCourses = courses;
  }

  useEffect(() => {
    if(utype===-1){
      fetch('http://localhost:5000/courses/get')
      .then(res=>res.json())
      .then(data=>setCourses(data))
    }
    else{
      fetch('http://localhost:5000/courses/get')
      .then(res=>res.json())
      .then(data=>{
        const newData = data.filter(course =>userCourses.includes(course.course_id))
        setCourses(newData)})

    }
    
  })

  const handleChange = async (id) =>{

    if(userCourses.includes(id)||utype===-1){

      setForum(id);
      console.log(id);
      await fetch('http://localhost:5000/content/get?course_id='+id+'&type=forum')
        .then(res => res.json())
        .then(data => setPosts(data))
    }
    else{
      setOpen(true);
    }
  }
  return (
    <Container>
        <Typography >Choose a Course to Enter Course Discussion</Typography>
        <div>
            <TextField
                id ="type"
                select
                fullWidth
                required
                color="secondary"
                label = "choose forum"
            >
                {courses.map(course=>(
                    <MenuItem key={course.course_id} value={course.course_id} onClick = {()=>{handleChange(course.course_id)}}>{course.course_title}</MenuItem>
                ))}
            </TextField>
        </div>

        
        <List className={classes.heading}>
          {posts.map(post=>(
            <ListItem key={post.content_id} align-Items="flex-start">
              <ListItemAvatar>
                    <Avatar className={classes.avatar}>{(post.title)[0].toUpperCase()}</Avatar>
              </ListItemAvatar>
                <ListItemText primary={post.title}
                secondary={
                  <span>
                  <Typography
                   component="span"
                   variant="body2"
                   className={classes.inline}
                    >{post.content} </Typography>
                    - {formatDistanceToNowStrict(new Date(post.date_and_time),{addSuffix: true})}
                  </span>
                }/>
                </ListItem>
          ))}

        </List>
        
        <ForumPost forum={forum}/>

        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"You are not Enrolled in this Course"}</DialogTitle>
         <DialogContent>
          <DialogContentText>
             You must be Enrolled as a student of this Course to Participate in the discussion forum of this Course.
          </DialogContentText>
         </DialogContent>
        <DialogActions>
          <Button  autoFocus onClick={handleClose} color="secondary">
            Dismiss
          </Button>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Enroll Now
          </Button>
        </DialogActions>
        </Dialog>
    </Container>
  )
}
