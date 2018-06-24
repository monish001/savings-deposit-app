// ./react-redux-client/src/reducers/index.js
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import savingDepositReducer from './savingDepositReducer';
export default combineReducers({
  appState: appReducer,
  savingDepositState: savingDepositReducer,
  routing
  // More reducers if there are
  // can go here
})
