// ./client/src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import SavingDeposits from './containers/SavingDeposits';
import SavingDepositForm from './containers/SavingDepositForm';
import SavingDeposit from './containers/SavingDeposit';
import SavingDepositsReport from './containers/SavingDepositsReport';

// @todo import Users from './containers/Users';
// import User from './containers/User';
// <Route path="/users" component={Users} />
// <Route path="/users/:id" component={User} />

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SavingDeposits} />
    <Route path="/saving-deposits" component={SavingDeposits} />
    <Route path="/saving-deposits/create" component={SavingDepositForm} />
    <Route path="/saving-deposits/report/:startDate/:endDate" component={SavingDepositsReport} />
    <Route path="/saving-deposits/:id" component={SavingDeposit} />
  </Route>
)