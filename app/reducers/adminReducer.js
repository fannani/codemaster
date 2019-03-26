// import { combineReducers } from 'redux';
// import logs from './logs';
//
// export default combineReducers({
//   logs,
// });
export const initialState = {
  isLogin: false,
  user: {},
};
export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: action.isLogin,
        user: action.user,
      };

    case 'LOGOUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
};
