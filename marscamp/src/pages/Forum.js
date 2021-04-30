import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import ForumPost from '../forms/ForumPost';

export default function Forum() {
  const [notes, setNotes] = useState([]);
  const [courses,setCourses] = useState([]);
  const [forum,setForum] = useState(1);
  const type = 'forum';
  


  useEffect(() => {
    fetch('http://localhost:5000/courses/get')
      .then(res=>res.json())
      .then(data=>setCourses(data))
  }, [])

  const handleChange = async (e) =>{

    await fetch('http://localhost:5000/content/get?course_id='+forum+'&type=forum')
    .then(res => res.json())
    .then(data => setNotes(data))
    console.log(forum,type)
      console.log('forum changed to ' + `${e.target.value}` )
      console.log(notes);
      setForum(e.target.value);
      console.log(forum);
  }

  const handleDelete = async (id) => {
    await fetch('http://localhost:5000/courses/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };
  console.log(notes);

  return (
    <Container>
        <Typography>Choose a Course to Enter Course Discussion</Typography>
        <div>
            <TextField
                id ="type"
                select
                fullWidth
                required
                color="secondary"
                label = "choose forum"
                onChange = {handleChange}
            >
                {courses.map(course=>(
                    <MenuItem key={course.course_id} value={course.course_id}>{course.course_title}</MenuItem>
                ))}
            </TextField>
        </div>
        <ForumPost forum={forum} />
        <Paper elevation={0} variant="outlined">
        <List>
          {notes.map(note=>(
            <ListItem key={note.content_id} align-Items="flex-start">
              
              <ListItemText primary={note.title}
                secondary={
                  <Typography variant="body2" >{note.content}-{note.user_id}</Typography>
                }
              />
            <Divider variant="inset" component="li" />
            </ListItem>
          ))}

        </List>
        </Paper>
    </Container>
  )
}
