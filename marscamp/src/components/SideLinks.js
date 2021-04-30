import React,{useState} from 'react';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import { AddCircleOutlineOutlined, ForumOutlined, SubjectOutlined} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import ClassIcon from '@material-ui/icons/Class';
import FeedbackIcon from '@material-ui/icons/Feedback';
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
    const utype = userToken.user_type === 'STUDENT'? 0 : (userToken.user_type==='FACULTY'? 1 : -1 );
    const menuItemsAdmin = [
    { 
      text: 'Courses', 
      icon: <ClassIcon color="secondary" />, 
      path: '/' ,
    },
    {
      text: 'Applications',
      icon: <ForumOutlined color= "secondary"/>,
      path: '/applications'
    },
    { 
      text: 'Create Course', 
      icon: <AddIcon color="secondary" />, 
      path: '/create' ,
    },
    {
      text : 'Create Post',
      icon : <AddCircleOutlineOutlined color="secondary" />,
      path : '/post',
    },
    {
      text : 'Forum',
      icon : <ForumOutlined color="secondary" />,
      path : '/forum',
    }
    
    ];
    const menuItemsStudent = [
    { 
      text: 'Courses', 
      icon: <ClassIcon color="secondary"/>, 
      path: '/' ,
    },
    {
      text : 'Forum',
      icon : <ForumOutlined color="secondary" />,
      path : '/forum',
    }
    ];

    const menuItemsFaculty = [
        { 
      text: 'Courses', 
      icon: <ClassIcon color="secondary" />, 
      path: '/' ,
    },
    {
      text : 'Create Post',
      icon : <AddCircleOutlineOutlined color="secondary" />,
      path : '/post',
    },
    {
      text : 'Forum',
      icon : <ForumOutlined color="secondary" />,
      path : '/forum',
    },
    {
      text : 'FeedBack',
      icon : <FeedbackIcon color="secondary"/>,
      path : '/reviews'
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