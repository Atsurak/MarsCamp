import { Button, Container, makeStyles, Paper, TextField } from '@material-ui/core';
import { Send, SendOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  post : {
      marginLeft: 20,
      marginRight : 20,
  }
})

export default function Feedback(){
    const classes = useStyles();
    const history= useHistory();
    const [details, setDetails] = useState('');
    const [detailsError, setDetailsError] = useState(false);
    let userToken = JSON.parse(localStorage.getItem('token'));
    const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
    let course_id = history.location.state.id;
    const user_id = userToken[0].registration_no;
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      setDetailsError(false);
      const content = details;
      console.log(content,user_id,course_id);

    if (details === '') {
      setDetailsError(true)
    }
    if (details){
      fetch('http://localhost:5000/feedback/add', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ content, user_id, course_id})
      })
    } 
  }

    return(
        <div>
            <Container size="sm">
            <form className={classes.post} onSubmit={handleSubmit}>
                <TextField className={classes.field}
                onChange={(e) => setDetails(e.target.value)}
                  label="Message"
                  variant="outlined"
                  color="secondary"
                  multiline
                  rows={6}
                  fullWidth
                  required
                  error={detailsError}
                  placeholder={
                      'Enter Feedback for the Course What did you feel is Good What can we do better to improve this course any suggestions that you would like to give to the future students of this course' 
                  }
                />
                <Button
                 type="submit"
                 variant="contained"
                 color="secondary"
                 endIcon = {<Send/>}
                >
                 Post
                </Button>
            </form>
            </Container>
        </div>


    )
}