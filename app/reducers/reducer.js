import { combineReducers } from 'redux';
import users from './users';
import logs from './logs';

export default combineReducers({
  users,
  logs,
});
