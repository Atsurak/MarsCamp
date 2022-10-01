import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { blue } from '@material-ui/core/colors';

import Layout from './components/Layout'
import useToken from './components/useToken'

import CreateCourse from './forms/CreateCourse'
import CreatePost from './forms/CreatePost'
import Feedback from './forms/Feedback'

import Applications from './pages/Applications'
import Course from './pages/Course';
import Forum from './pages/Forum'
import Home from './pages/Home'
import Reviews from './pages/Reviews'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Test from './pages/Test'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: blue
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
  const { token, setToken } = useToken();
  if (!token) {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              {token ? <Redirect to="/home" /> : <SignIn setToken={setToken} />}
            </Route>
            <Route path="/signup">
              {token ? <Redirect to="/home" /> : <SignUp />}
            </Route>
            <Route>
              <SignIn setToken={setToken} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
  else {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/signin">
              <SignIn setToken={setToken} />
            </Route>
            <Layout>
              <Route exact path="/">
                {token ? <Redirect to="/home" /> : <SignIn setToken={setToken} />}
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/create">
                <CreateCourse />
              </Route>
              <Route path="/forum">
                <Forum />
              </Route>
              <Route path="/post">
                <CreatePost />
              </Route>
              <Route path="/course">
                <Course />
              </Route>
              <Route path="/applications">
                <Applications />
              </Route>
              <Route path="/feedback">
                <Feedback />
              </Route>
              <Route path="/reviews">
                <Reviews />
              </Route>
              <Route path="/test">
                <Test />
              </Route>
            </Layout>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
