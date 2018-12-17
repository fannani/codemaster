import { combineReducers } from 'redux';
import courses from './courses';
import stages from './stages';
import missions from './missions';
import gameplay from './gameplay';

export default combineReducers({
  courses,
  stages,
  missions,
  gameplay,
});
