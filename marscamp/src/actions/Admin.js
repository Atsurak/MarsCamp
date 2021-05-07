import React from 'react';
import {DeleteOutlined} from '@material-ui/icons';
import { IconButton} from '@material-ui/core';
 
export default function Admin({utype,note}){
    
    const handleDelete = async (id) =>{
        await fetch('http://localhost:5000/courses/delete', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ id })
        })
    }
    
    if (utype===-1){
      return(
      <IconButton onClick={() => handleDelete(note.course_id)}>
              <DeleteOutlined />
      </IconButton>
      )}
}