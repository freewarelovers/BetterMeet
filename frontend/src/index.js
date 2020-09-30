import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks'
import {apolloClient} from "./apolloClient"

import Home from "./pages/home/index"
import Signup from "./pages/registration/signup/index"
import Signin from "./pages/registration/signin/index"
import Dashboard from "./pages/events/dashboard/index"
import CreateCommunity from "./pages/groups/create_community/index"
import CommunityPage from "./pages/groups/community_page/index"
import EventPage from "./pages/events/event/index"
import './index.css';
import {  Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
ReactDOM.render(
  <React.StrictMode>
  <ApolloProvider client={apolloClient}>
    <Router>
    <Grommet theme={grommet}>
    <Switch>
      
      <Route exact path="/" component={Home} />
     
      <Route exact path="/signup" component={Signup} />
   
      <Route exact path="/signin" component={Signin} />

      <Route  path="/dashboard/:name" component={Dashboard} />
      
      <Route exact   path="/create-community" component={CreateCommunity} />

      <Route exact   path="/communities/:slug" component={CommunityPage} />

      <Route path="/communities/:slug/event/:id" component={EventPage} />

      <Route path="/event/:id" component={EventPage} />
     
      </Switch>
      </Grommet>     
    </Router>
    </ApolloProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
