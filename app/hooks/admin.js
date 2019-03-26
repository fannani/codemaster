import { useContext } from 'react';
import AppContext from '../utils/context';
import userService from '../services/userService';

const useAdmin = () => {
  const [state, dispatch] = useContext(AppContext);

  const login = (email, password) => {
    const request = () => {
      return { type: 'LOGIN_REQUEST' };
    };
    const success = (user, isLogin) => {
      return { type: 'LOGIN_SUCCESS', user, isLogin };
    };
    dispatch(request());
    return userService.login(email, password, 'admin').then(user => {
      let isLogin = false;
      if (user) {
        isLogin = true;
      }
      dispatch(success(user, isLogin));

      return user;
    });
  };

  const logout = () => {
    const request = () => ({ type: 'LOGOUT_REQUEST' });
    const success = () => ({ type: 'LOGOUT_SUCCESS' });
    dispatch(request());
    userService.logout();
    dispatch(success());
  };

  return {
    login,
    isLogin: state.isLogin && state.user.role === 'admin',
    user: state.user,
    logout,
  };
};

export default useAdmin;
