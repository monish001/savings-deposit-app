// ./client/src/routes.js
import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Profile from './containers/Profile';
import Login from './containers/Login';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer';
import Users from './containers/Users';
import UserCreate from './containers/UserCreate';

export default (
  <Route path="/" component={App}>
    <Route path="/login" component={Login} />
    <Route component={EnsureLoggedInContainer}>
      <Route path="/profile" component={Profile} />
      <Route path="/users" component={Users} />
      <Route path="/users/create" component={UserCreate} />
    </Route>
  </Route>
)