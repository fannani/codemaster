import { useContext } from 'react';
import AppContext from '../utils/context';
import userService from '../services/userService';

const usePlayer = () => {
  const [state, dispatch] = useContext(AppContext);

  const updateTimer = () => ({
    type: 'UPDATE_TIMER',
  });

  const login = (email, password) => {
    const request = () => {
      return { type: 'LOGIN_REQUEST' };
    };
    const success = (user, isLogin) => {
      return { type: 'LOGIN_SUCCESS', user, isLogin };
    };
    dispatch(request());
    return userService.login(email, password).then(user => {
      let isLogin = false;
      if (user) {
        isLogin = true;
      }
      dispatch(success(user, isLogin));

      return user;
    });
  };

  return {
    login,
    isLogin: state.isLogin,
    user: state.user,
    incrementTimer: () => {
      dispatch(updateTimer());
    },
    gameplay: state.gameplay,
  };
};

export default usePlayer;
