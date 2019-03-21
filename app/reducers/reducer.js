import { combineReducers } from 'redux';
import gameplay from './gameplay';
import users from './users';
import logs from './logs';

export default combineReducers({
  gameplay,
  users,
  logs,
});
