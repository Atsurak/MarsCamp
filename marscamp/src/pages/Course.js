import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import { useHistory } from 'react-router';
import Container from '@material-ui/core/Container'
import { Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PostCard from '../cards/PostCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingBottom : 20,
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Course(){
  const [course, setCourse] = useState('');
  const [notes, setNotes] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  const userToken = JSON.parse(localStorage.getItem('token'))[0];
  const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
  let id = 1;
  if(history.location.state!==undefined){
    id = history.location.state.id;
  }
  else if(utype===1){
    id=userToken.course_id;
  }
  else{
    history.push('/home');
  }

  useEffect(() => {
    const req = 'http://localhost:5000/content/get/'+id;
    fetch(req)
      .then(res => res.json())
      .then(data => setNotes(data))

    fetch('http://localhost:5000/courses/get/' + id)
     .then(res=>res.json())
     .then(data=>setCourse(data[0]))
     console.log(id);
  }, [id])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/courses/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const handleClick = async (type) => {
    await fetch('http://localhost:5000/content/get?course_id='+id+'&type='+type)
    .then(res => res.json())
    .then(data => setNotes(data))
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  if(notes==='[]'){
    return(
      <div>Sorry No Data Found Try Again Later</div>
    )
  }

  return (
    <Container>
       <Typography variant = "h4" className={classes.root}>{course.course_title}</Typography>
      <div className={classes.root}>
        <Chip
        label="Announcements"
        variant="outlined"
        onClick ={()=>{handleClick('announcement')}}
        />
        <Chip
        label="Material"
        variant="outlined"
        onClick ={()=>{handleClick('material')}}
        />
        <Chip
        label="Tests"
        variant="outlined"
        onClick ={()=>{handleClick('test')}}
        />
        <Chip
        label="Forum Posts"
        variant="outlined"
        onClick ={()=>{handleClick('forum')}}
        />

      </div>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {notes.map(note => (
          <div key={note.content_id}>
            <PostCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}