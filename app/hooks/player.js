import { useContext, useEffect } from 'react';
import AppContext from '../utils/context';
import userService from '../services/userService';

const usePlayer = () => {
  const context = useContext(AppContext);
  const login = (email, password) => {
    return userService.login(email, password).then(user => {
      let isLogin = false;
      if (user) {
        isLogin = true;
      }
      context.setUser(user);
      context.setIsLogin(isLogin);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLogin', isLogin);
      return user;
    });
  };

  useEffect(() => {
    context.setUser(JSON.parse(localStorage.getItem('user')));
    context.setIsLogin(localStorage.getItem('isLogin'));
    context.setLoadingLocal(true);
  }, []);

  return {
    login,
    isLogin: context.isLogin,
    user: context.user,
    loadingLocal: context.loadingLocal,
  };
};

export default usePlayer;
