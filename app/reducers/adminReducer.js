
import { combineReducers } from 'redux';
import logs from './logs';
import courses from './courses';
import stages from './stages';

export default combineReducers({
    logs,courses,stages
});
