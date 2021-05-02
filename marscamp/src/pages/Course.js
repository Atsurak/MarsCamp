import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import PostCard from '../cards/PostCard';
import { useHistory } from 'react-router';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
  const [color,setColor]=useState();

  const userToken = JSON.parse(localStorage.getItem('token'))[0];
  const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
  let id = 1;
  if(history.location.state!=undefined){
    id = history.location.state.id;
  }

  useEffect(() => {
    const req = 'http://localhost:5000/content/get/'+id;
    fetch(req)
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/courses/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id != id)
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