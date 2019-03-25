import { useContext } from 'react';
import AppContext from '../utils/context';
import userService from '../services/userService';

const usePlayer = () => {
  const [state, dispatch] = useContext(AppContext);

  const login = (email, password) => {
    return userService.login(email, password).then(user => {
      let isLogin = false;
      if (user) {
        isLogin = true;
      }
      dispatch({
        type: 'LOGIN_SUCCESS',
        user,
        isLogin,
      });

      return user;
    });
  };

  return {
    login,
    isLogin: state.isLogin,
    user: state.user,
  };
};

export default usePlayer;
