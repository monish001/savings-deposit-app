// ./client/src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import SavingDeposits from './containers/SavingDeposits';
import SavingDepositForm from './containers/SavingDepositForm';
import SavingDeposit from './containers/SavingDeposit';
import SavingDepositsReport from './containers/SavingDepositsReport';
import Profile from './containers/Profile';
import Login from './containers/Login';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer';

// @todo import Users from './containers/Users';
// import User from './containers/User';
// <Route path="/users/:id" component={User} />

export default (
  <Route path="/" component={App}>
    <Route path="/login" component={Login} />

    <Route component={EnsureLoggedInContainer}>
      <IndexRoute component={SavingDeposits} />
      <Route path="/profile" component={Profile} />
      <Route path="/saving-deposits" component={SavingDeposits} />
      <Route path="/saving-deposits/create" component={SavingDepositForm} />
      <Route path="/saving-deposits/report/:startDate/:endDate" component={SavingDepositsReport} />
      <Route path="/saving-deposits/:id" component={SavingDeposit} />
    </Route>
  </Route>
)