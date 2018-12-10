
import { combineReducers } from 'redux';
import levels from './levels';
import stages from './stages';
import course from './course';
import missions from './mission';
export default combineReducers({
    levels,stages,course,missions
});
