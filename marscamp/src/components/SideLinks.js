import React,{useState} from 'react';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import { AddCircleOutlineOutlined, ForumOutlined, SubjectOutlined} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useLocation } from 'react-router';
const useStyles = makeStyles(() => {
  return {
    active: {
      background: '#f4f4f4',
    }
    }
})
 
export default function SideLinks(){
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const userToken = JSON.parse(localStorage.getItem('token'))[0];
    const utype = userToken.user_type === 'STUDENT'? 0 : 1;
    const menuItemsAdmin = [
    { 
      text: 'Courses', 
      icon: <SubjectOutlined color="secondary" />, 
      path: '/' ,
      type: [0,1]
    },
    { 
      text: 'Create Course', 
      icon: <AddIcon color="secondary" />, 
      path: '/create' ,
      type: [1]
    },
    {
      text : 'Create Post',
      icon : <AddCircleOutlineOutlined color="secondary" />,
      path : '/post',
      type : [0,1]
    },
    {
      text : 'Forum',
      icon : <ForumOutlined color="secondary" />,
      path : '/forum',
      type : [0,1]
    }
    
    ];
    const menuItemsStudent = [
    { 
      text: 'Courses', 
      icon: <SubjectOutlined color="secondary" />, 
      path: '/' ,
      type: [0,1]
    },
    {
      text : 'Forum',
      icon : <ForumOutlined color="secondary" />,
      path : '/forum',
      type : [0,1]
    }
    ];

    const menuItemsFaculty = [
        { 
      text: 'Courses', 
      icon: <SubjectOutlined color="secondary" />, 
      path: '/' ,
      type: [0,1]
    },
    {
      text : 'Create Post',
      icon : <AddCircleOutlineOutlined color="secondary" />,
      path : '/post',
      type : [0,1]
    },
    {
      text : 'Forum',
      icon : <ForumOutlined color="secondary" />,
      path : '/forum',
      type : [0,1]
    }
    ]
  

  if(utype===-1){
      return(
          <List>
          {menuItemsAdmin.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      )
  }
  else if(utype===1){
      return(
          <List>
          {menuItemsFaculty.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      )
  }
  else{
      return(
          <List>
          {menuItemsStudent.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      )
  }


}