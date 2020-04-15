import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import PasswordSetupForm from './components/auth/password-setup';
import SignInForm from './components/auth/sign-in';
import Home from './components/home/home';
import SetupRegistration from './components/auth/setup-registeration';


class App extends React.Component{

  
  render(){
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={SignInForm} />
          <Route path="/setup_password" component={PasswordSetupForm} />
          <Route path="/home" component={Home} />
          <Route path="/setup_account/:token" component={SetupRegistration} />
          <Route exact={true} path="/" component={Home} />
        </div>
      </Router>
    )
  }
  

}


export default (App);
