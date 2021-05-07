import React from 'react';
import { makeStyles, Avatar, Drawer, Toolbar, Typography, AppBar, Link } from '@material-ui/core';
import { format } from 'date-fns';
import SimpleMenu from './SimpleMenu';
import { blue } from '@material-ui/core/colors';
import SideLinks from './SideLinks';
import useToken from './useToken';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4',
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    name: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
      backgroundColor : blue[800]
    },
    hidden:{
      display : 'none'
    }
  }
})

export default function Layout({ children }) {
  const classes = useStyles();
  // eslint-disable-next-line
  const {token,setToken} = useToken();
  let userToken = {};
  if(token){
    userToken = JSON.parse(localStorage.getItem('token'))[0];
  }
  

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.name}>
            Hey! {userToken.first_and_last_name}, Welcome to Mars Camp!
          </Typography>
          <Typography>{format(new Date(), 'do MMMM Y')}</Typography>
          <Avatar className={classes.avatar}><SimpleMenu/></Avatar>
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.title}>
          <Typography variant="h5" display="inline" >
            
            <Link href="/" color="inherit" underline="none">
             Mars Camp </Link>
          </Typography>
        </div>
        {/* links/list section <Avatar className={classes.logo} src="./mars.png"/>*/}
        <SideLinks/>
      </Drawer>
      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}
