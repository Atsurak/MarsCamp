import React, { useState } from 'react';
import {Button } from '@material-ui/core';
 
export default function Faculty({utype,note}){


    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    const [msg,setMsg]=useState(userToken.course_id===note.course_id?'Applied':'Apply');

    const handleApply = async (id) => {
      const course_id = id;
      const user_id = userToken.registration_no;
        await fetch('http://localhost:5000/instructor/subject', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ course_id, user_id})
        })
        if(msg==='Apply') setMsg('Applied')
    }


    if(utype===1){
    return(
        <Button
        type="contained"
        color="secondary"
        onClick={() => handleApply(note.course_id)}
        size="small"
        >{msg}
        </Button>
    )}
}