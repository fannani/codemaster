import { combineReducers } from 'redux';
import courses from './courses';
import stages from './stages';
import missions from './missions';
import gameplay from './gameplay';
import users from './users';

export default combineReducers({
  courses,
  stages,
  missions,
  gameplay,
  users,
});
