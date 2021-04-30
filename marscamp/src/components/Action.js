import React, { useState } from 'react';
import {DeleteOutlined} from '@material-ui/icons';
import { IconButton, Button } from '@material-ui/core';
 
export default function Action({utype,note}){

    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    const userCourses = JSON.parse(localStorage.getItem('token'))[1];
    console.log(userToken,userCourses);


    const [msg,setMsg]=useState(userCourses.includes(note.course_id)?'Enrolled':'Enroll');
    const handleApply = async (id) => {
      const course_id = id;
      const user_id = userToken.registration_no;
        await fetch('http://localhost:5000/instructor/apply', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ course_id, user_id})
        })
        if(msg==='Enroll') setMsg('Enrolled')
    }

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

    const handleDelete = async (id) =>{
      const course_id = id;
        await fetch('http://localhost:5000/courses/delete', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ course_id })
        })
        if(msg==='Enroll') setMsg('Enrolled')
    }

    console.log('my type is' + utype);

    if(utype===0){
    return(
        <Button
        type="contained"
        color="secondary"
        onClick={() => handleEnroll(note.course_id)}
        size="small"
        >{msg}
        </Button>
    )}
    else if (utype===-1){
      return(
      <IconButton onClick={() => handleDelete(note.course_id)}>
              <DeleteOutlined />
            </IconButton>
      )}
    else{
      return(
      <IconButton onClick={() => handleApply(note.course_id)}>
              <DeleteOutlined />
            </IconButton>
      )}

}