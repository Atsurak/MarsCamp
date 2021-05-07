import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import { Send} from '@material-ui/icons';
import React, { useState } from 'react';


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

export default function ForumPost({forum}){
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    let userToken = JSON.parse(localStorage.getItem('token'));
    //const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
    let course_id = forum;
    const user_id = userToken[0].registration_no;
    const type = 'forum';
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setTitleError(false);
      setDetailsError(false);
      const content = details;
      console.log(content,user_id,course_id,type);

    if (title === '') {
      setTitleError(true)
    }
    if (details === '') {
      setDetailsError(true)
    }
    if (title && details) {
      console.log('i am clicked')
      
      fetch('http://localhost:5000/content/add', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, content, user_id, course_id, type})
      }).then(()=>{
        setTitle('');
        setDetails('');
      })
    } 
  }

    return(
        <div>
            <Container size="sm">
            <form className={classes.post} onSubmit={handleSubmit}>
                <TextField className={classes.field}
                onChange={(e) => setTitle(e.target.value)}
                 label="Message Title" 
                 variant="outlined" 
                 color="secondary" 
                 fullWidth
                 required
                 error={titleError}

                />
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