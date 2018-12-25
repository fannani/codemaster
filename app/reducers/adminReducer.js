import { combineReducers } from 'redux';
import logs from './logs';
import stages from './stages';
import missions from './missions';

export default combineReducers({
  logs,
  stages,
  missions,
});
