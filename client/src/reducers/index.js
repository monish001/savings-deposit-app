import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  appState: appReducer,
  profileState: profileReducer,
  usersState: usersReducer,
  routing,
  // More reducers if there are
  // can go here
})
