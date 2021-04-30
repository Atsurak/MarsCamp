import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import ForumPost from '../forms/ForumPost';
 
export default function Reviews(){

    const [notes, setNotes] = useState([]);
    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    const id = userToken.course_id;
    const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
    
  useEffect(() => {
    fetch('http://localhost:5000/feedback/get/'+id)
      .then(res=>res.json())
      .then(data=>setNotes(data))
  }, [])

//   const handleChange = async (e) =>{

//     await fetch('http://localhost:5000/content/get?course_id='+forum+'&type=forum')
//     .then(res => res.json())
//     .then(data => setNotes(data))
//     console.log(forum,type)
//       console.log('forum changed to ' + `${e.target.value}` )
//       console.log(notes);
//       setForum(e.target.value);
//       console.log(forum);
//   }

//   const handleDelete = async (id) => {
//     await fetch('http://localhost:5000/courses/' + id, {
//       method: 'DELETE'
//     })
//     const newNotes = notes.filter(note => note.id != id)
//     setNotes(newNotes)
//   }

//   const breakpoints = {
//     default: 3,
//     1100: 2,
//     700: 1
//   };
  



    return(
        <Container>
        <Typography>Feedback Given by Students of Your Course</Typography>
        <Paper elevation={0} variant="outlined">
        <List>
          {notes.map(note=>(
            <ListItem key={note.feedback_id} align-Items="flex-start">
              
              <ListItemText primary={note.user_id}
                secondary={
                  <Typography variant="body2" >{note.content}</Typography>
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