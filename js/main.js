import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../components/home.jsx';
import SourceListing from '../components/SourceListing.jsx';
import HeadLines from '../components/HeadLines.jsx';
import ForgotPassword from '../components/ForgotPassword.jsx';
import Success from '../components/Success.jsx';
import '../sass/home.scss';

import { render } from 'react-dom';
import {Router, Route} from 'react-router';
import { hashHistory } from 'react-router';

function loggedIn() {
  if(localStorage.getItem("loggedin")=='true'){
        return true;
    }
    else{
        return false;
    }
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/'
    })
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/home" component={SourceListing} onEnter={requireAuth} />
    <Route path="/headlines" component={HeadLines} onEnter={requireAuth} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/success" component={Success} />
  </Router>
), document.getElementById('app'));