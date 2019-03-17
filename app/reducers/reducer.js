import { combineReducers } from 'redux';
import stages from './stages';
import gameplay from './gameplay';
import users from './users';
import logs from "./logs";

export default combineReducers({
  stages,
  gameplay,
  users,
  logs,
});
