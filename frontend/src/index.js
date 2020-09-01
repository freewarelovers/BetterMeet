import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from "./pages/home/index"
import Signup from "./pages/registration/signup/index"
import Signin from "./pages/registration/signin/index"
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>  
      <Route exact path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/signin">
        <Signin/>
      </Route>
      </Switch>     
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
