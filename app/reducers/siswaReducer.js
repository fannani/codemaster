import { combineReducers } from 'redux';
import stages from './stages';
import missions from './missions';
import gameplay from './gameplay';
import users from './users';

export default combineReducers({
  stages,
  missions,
  gameplay,
  users,
});
