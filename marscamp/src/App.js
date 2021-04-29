import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import useToken from './components/useToken'
import Home from './pages/Home'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {Redirect} from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Layout from './components/Layout'
import CreateCourse from './forms/CreateCourse'
import CreatePost from './forms/CreatePost'
import { blue } from '@material-ui/core/colors'
import ForumPost from './forms/ForumPost'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary:blue
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {

  const userToken = JSON.parse(localStorage.getItem('token'))[0];
  const utype = userToken.user_type === 'STUDENT'? 0 : 1;

  const {token,setToken} = useToken();
  if(!token) {
    return (
      <ThemeProvider theme={theme}>
      <Router>
        <Switch>
            <Route exact path="/">
              {token ? <Redirect to="/home"/> : <SignIn setToken={setToken}/>}
            </Route>
            <Route path="/signup">
              {token ? <Redirect to="/home"/> : <SignUp/>}
            </Route>
            <Route>
              <SignIn setToken={setToken}/>
            </Route>
        </Switch>
      </Router>
    </ThemeProvider>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
           <Route path = "/signin">
              <SignIn setToken={setToken}/>
            </Route>
         <Layout>
            <Route exact path="/">
              {token ? <Redirect to="/home"/> : <SignIn setToken={setToken}/>}
            </Route>
            <Route path = "/home">
              <Home/>
            </Route>
            <Route path = "/create">
              <CreateCourse/>
            </Route>
            <Route path = "/forum">
              <ForumPost/>
            </Route>
            <Route path="/post">
              <CreatePost/>
            </Route>
         </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
