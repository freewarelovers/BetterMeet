import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Home from './domain/home/index'
import Login from "./domain/registration/login/index"
import Signup from "./domain/registration/signin/index"

import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Login/>
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
