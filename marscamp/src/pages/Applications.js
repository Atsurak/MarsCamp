import React, { useEffect, useState } from 'react';
import { Container, Button, List, ListItem, ListItemText } from '@material-ui/core';

export default function Applications() {
  const [users,setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/instructor/getunapp')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  

//   const handleDelete = async (id) => {
//     await fetch('http://localhost:5000/courses/' + id, {
//       method: 'DELETE'
//     })
//     const newNotes = notes.filter(note => note.id != id)
//     setNotes(newNotes) getCourse(user.course_id).description
//   }

  const handleApprove = async (id) => {
    console.log(id);
    await fetch('http://localhost:5000/instructor/approve', {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({user_id : id})
    })
   
  }
  return (
    <Container>
      <List>

          {users.map(user=>(
              <div key={user.user_id}>
                  <ListItem>
                      <ListItemText primary={user.first_and_last_name} secondary={user.user_id}/>
                      <ListItemText primary={user.course_title}/>
                      <Button color="secondary"onClick={()=>{handleApprove(user.user_id)}} >Approve</Button>
                      <Button>Delete</Button>
                  </ListItem>
                  <div>
              {}
              </div>
              </div>
              
                
          ))}

      </List>
    </Container>
  )
}
