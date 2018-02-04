import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Switch, BrowserRouter } from 'react-router-dom';

import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

ReactDOM.render(
  <App />, document.getElementById('root')
)