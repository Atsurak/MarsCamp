import React from 'react'
import {useHistory} from 'react-router';
import { yellow, green, pink,orange } from '@material-ui/core/colors';
import {makeStyles, Avatar,IconButton, Card, CardHeader, CardContent, Typography, Button} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.content_type === 'material') {
        return yellow[700]
      }
      if (note.content_type === 'announcement') {
        return green[500]
      }
      if (note.content_type === 'test') {
        return pink[500]
      }
      return orange[500]
    },
  },
  link : {
    color : '#e91e63'
  }
})

export default function PostCard({ note, handleDelete }) {
  const classes = useStyles(note);
  const history = useHistory();
  //const userToken = JSON.parse(localStorage.getItem('token'))[0];
  //const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
  const handleClick = (id) => {
    history.push({
      pathname : '/test',
      state : {id :id}
    });
  }

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.title[0].toUpperCase()}
            </Avatar>}
          title={note.title}
          subheader={note.user_id}
        />
        <CardContent onClick={()=>{history.push('/course')}}>
            <Typography variant="body2" color="textSecondary">
            { note.content} 
            {note.file_path?<div className={classes.link} color = "secondary"><a href={"/Server/"+note.file_path.substring(12)} download >
            <IconButton>
            <ArrowDownwardIcon color="secondary"/>
            </IconButton> Download
            </a></div>: null}
            {/* {note.content_type==='test'?<div>
              <Button
              color="secondary"
              type="button"
              onClick={()=>{history.push('/forum')}}
              startIcon={<AssignmentIcon/>}
              >Take test</Button>
             {/* <IconButton  onClick={()=>{history.push('/forum')}}>
            <AssignmentIcon color="secondary"/>
            </IconButton> Taketest 
            </div>: null}}*/}
          </Typography>
        </CardContent>
        {note.content_type==='test'?<Button
              color="secondary"
              type="button"
              startIcon={<AssignmentIcon/>}
              onClick={()=>{handleClick(note.content_id)}}
              
              >Take test</Button>:null}
      </Card>
    </div>
  )
}