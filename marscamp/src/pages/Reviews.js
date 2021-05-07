import React, { useEffect, useState } from 'react';
import { Container, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, makeStyles } from '@material-ui/core';
import {formatDistanceToNowStrict} from 'date-fns';
const useStyles = makeStyles({
  heading : {
    marginBottom : 20,
    paddingBottom : 20,
    color : '#dd5692'
  },
  avatar : {
    backgroundColor : '#dd5692'
  }
});
export default function Reviews(){

    const [reviews, setReviews] = useState([]);
    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    const id = userToken.course_id;
    //const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
    const classes = useStyles();
    
  useEffect(() => {
    fetch('http://localhost:5000/feedback/get/'+id)
      .then(res=>res.json())
      .then(data=>setReviews(data))
  }, [id])

    return(
        <Container>
        <Typography className={classes.heading}>Feedback Given by Students of Your Course</Typography>
        <Paper elevation={0} variant="outlined">
        <List>
          {reviews.map(review=>(
            <ListItem key={review.feedback_id} align-Items="flex-start">
              <ListItemAvatar>
                    <Avatar className={classes.avatar}>{(review.content)[0].toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={review.user_id}
                secondary={
                  <span>
                  <Typography
                   component="span"
                   variant="body2"
                   className={classes.inline}
                    >{review.content} </Typography>
                    - {formatDistanceToNowStrict(new Date(review.date_and_time),{addSuffix : true})}
                  </span>
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