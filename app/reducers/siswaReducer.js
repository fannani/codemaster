
import { combineReducers } from 'redux';
import courses from './courses';
import stages from './stages';
import course from './course';
import missions from './missions';
export default combineReducers({
    courses,stages,course,missions
});
