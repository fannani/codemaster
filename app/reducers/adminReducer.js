
import { combineReducers } from 'redux';
import logs from './logs';
import courses from './courses';
import stages from './stages';
import missions from './missions';

export default combineReducers({
    logs,courses,stages,missions
});
