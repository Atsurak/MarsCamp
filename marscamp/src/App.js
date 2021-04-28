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
import { Forum } from '@material-ui/icons'
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

  const {token,setToken} = useToken();
  if(!token) {
    return <SignIn setToken={setToken} />
  }

  

  // if(!token){
  //   return <SignIn setToken={setToken}/>
  // }
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Layout>
        <Switch>
            <Route exact path="/">
              {token ? <Redirect to="/home"/> : <SignUp/>}
            </Route>
            <Route path="/signin">
              {token ? <Redirect to="/home"/> : <SignIn/>}
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
            <Route>
              <CreatePost/>
            </Route>
          </Switch>
      </Layout>
    </Router>

    </ThemeProvider>
    
  );
}

export default App;
