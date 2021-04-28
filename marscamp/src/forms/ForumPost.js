import { Button, Container, makeStyles, Paper, TextField } from '@material-ui/core';
import { Send, SendOutlined } from '@material-ui/icons';
import React from 'react';


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

export default function ForumPost(){
    const classes = useStyles();

    return(
        <div>
            <Container size="sm">
            <form className={classes.post}>
                <TextField className={classes.field}
                 label="Summary" 
                 variant="outlined" 
                 color="secondary" 
                 fullWidth
                 required

                />
                <TextField className={classes.field}
                  label="Brief Description"
                  variant="outlined"
                  color="secondary"
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
                <Button
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