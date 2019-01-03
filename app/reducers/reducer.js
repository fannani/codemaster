import { combineReducers } from 'redux';
import stages from './stages';
import missions from './missions';
import gameplay from './gameplay';
import users from './users';
import logs from "./logs";

export default combineReducers({
  stages,
  missions,
  gameplay,
  users,
  logs,
});
