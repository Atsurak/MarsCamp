import React, { useState } from 'react';
import {DeleteOutlined} from '@material-ui/icons';
import { IconButton, Button } from '@material-ui/core';
 
export default function Action({utype,note}){

    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    const userCourses = JSON.parse(localStorage.getItem('token'))[1];
    console.log(userToken,userCourses);


    const [msg,setMsg]=useState(userCourses.includes(note.course_id)?'Enrolled':'Enroll');
    const handleApply = () => {

    }

    const handleEnroll = async (id) => {
        const course = id;
        const student = userToken.registration_no;
        await fetch('http://localhost:5000/student/enroll', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ course, student})
        })
        if(msg==='Enroll') setMsg('Enrolled')
        
    }

    const handleDelete = () =>{

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