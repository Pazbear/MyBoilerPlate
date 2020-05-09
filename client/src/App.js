import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavBar from './components/views/NavBar/NavBar'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Footer from './components/views/Footer/Footer'
import Auth from './hoc/auth'
function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Switch>
          <Route path="/register" component={Auth(RegisterPage, false)}>
          </Route>
          <Route path="/login" component={Auth(LoginPage, false)}>
          </Route>
          <Route path="/" component={Auth(LandingPage, null)}>
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
