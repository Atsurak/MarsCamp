import React, { useState } from 'react';
import { IconButton, Button, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
 
export default function Student({utype,note}){
    const history = useHistory();
    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    const userCourses = JSON.parse(localStorage.getItem('token'))[1];
    const [msg,setMsg]=useState(userCourses.includes(note.course_id)?'Enrolled':'Enroll');

    const handleEnroll = async (id) => {
        const course_id = id;
        const user_id = userToken.registration_no;
        await fetch('http://localhost:5000/student/enroll', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ course_id, user_id})
        })
        if(msg==='Enroll') setMsg('Enrolled')
    }

    const handleClick = (id) => {
        console.log(id);
        history.push({
            pathname: '/feedback',
            state: {id :id}
        });
    }

    if(utype===0){
    return(
        <div>
        <MenuItem><Button
        type="contained"
        color="secondary"
        onClick={() => handleEnroll(note.course_id)}
        size="small"
        >{msg}
        </Button></MenuItem>
        <MenuItem onClick={()=>handleClick(note.course_id)}>Give Feedback</MenuItem>
        </div>
    )}

}