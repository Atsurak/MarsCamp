import React, { useState } from 'react';
import { useTheme, useMediaQuery, Button, MenuItem, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(()=>{
    return{
    red :{
        color :'#dd4832'
    },
    green : {
        color: '#4caf50'
    }
}
})
 
export default function Student({utype,note}){

    const history = useHistory();
    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    const userCourses = JSON.parse(localStorage.getItem('token'))[1];
    const [msg,setMsg]=useState(userCourses.includes(note.course_id)?'UnEnroll':'Enroll');
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleClose = () => {
        setOpen(false);
    };

    const handleEnroll = async (id) => {
        const course_id = id;
        const user_id = userToken.registration_no;
        await fetch('http://localhost:5000/student/enroll', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ course: course_id, student : user_id})
        })
        if(msg==='Enroll') setMsg('Enrolled')
    }

    const handleClick = (id) => {
        console.log(id);
        if(userCourses.includes(id)){
            history.push({
            pathname: '/feedback',
            state: {id :id}
        });
        }
        else{
            setOpen(true);
        }
        
    }

    if(utype===0){
    return(
    <div>

        <MenuItem><Button className={classes.red}
         type="contained"
         color="secondary"
         onClick={() => handleEnroll(note.course_id)}
         size="small"
        > {msg}
        </Button></MenuItem>

        <MenuItem><Button className={classes.green}
         type="contained"
         color = {green[600]} 
         onClick={()=>handleClick(note.course_id)}
        >Give Feedback
        </Button></MenuItem>

        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"You are not Enrolled in this Course"}</DialogTitle>
         <DialogContent>
          <DialogContentText>
             You must be Enrolled as a student of this Course to Give Feedback of this Course.
          </DialogContentText>
         </DialogContent>
        <DialogActions>
          <Button className={classes.red} autoFocus onClick={handleClose} color="secondary">
            Dismiss
          </Button>
          <Button className={classes.green} onClick={handleClose} color="secondary" autoFocus>
            Enroll Now
          </Button>
        </DialogActions>
        </Dialog>
    </div>
    )}
}