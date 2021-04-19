import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import useToken from './components/useToken'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import Signup from './pages/SignUp'


function App() {

  //const [token,setToken] = useState();
  const {token,setToken} = useToken();
  

  if(!token){
    return <SignIn setToken={setToken}/>
  }
  return (
    <Router>
          <Switch>
            <Route exact path="/">
              <Signup />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path = "/dashboard">
              <Dashboard/>
            </Route>
            <Route path = "/settings">
              <Settings/>
            </Route>
          </Switch>
    </Router>
  );
}

export default App;
