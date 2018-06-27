// ./react-redux-client/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import savingDepositReducer from './savingDepositReducer';
import savingDepositsReportReducer from './savingDepositsReportReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  appState: appReducer,
  savingDepositState: savingDepositReducer,
  savingDepositsReportState: savingDepositsReportReducer,
  profileState: profileReducer,
  routing
  // More reducers if there are
  // can go here
})
