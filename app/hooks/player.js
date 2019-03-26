import { useContext } from 'react';
import AppContext from '../utils/context';
import userService from '../services/userService';

const usePlayer = () => {
  const [state, dispatch] = useContext(AppContext);

  const setPlayerStatus = (score, life) => ({
    type: 'SET_PLAYER_STATUS',
    score,
    life,
  });

  const setPlayMode = play => ({
    type: 'SET_PLAY_MODE',
    play,
  });

  const updateTimer = () => ({
    type: 'UPDATE_TIMER',
  });

  const resetTimer = () => ({
    type: 'RESET_TIMER',
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

  const logout = () => {
    const request = () => ({ type: 'LOGOUT_REQUEST' });
    const success = () => ({ type: 'LOGOUT_SUCCESS' });
    dispatch(request());
    userService.logout();
    dispatch(success());
  };

  const reduceEnergy = (userid, energy) => {
    const request = () => ({ type: 'REDUCE_ENERGY_REQUEST' });
    const success = user => ({ type: 'REDUCE_ENERGY_SUCCESS', user });
    const failure = error => ({ type: 'REDUCE_ENERGY_FAILURE', error });
    dispatch(request());
    return userService.reduceEnergy(userid, energy).then(
      player => {
        dispatch(success(player));
      },
      error => {
        dispatch(failure(error));
      },
    );
  };

  return {
    login,
    isLogin: state.isLogin && state.user.role === 'siswa',
    user: state.user,
    incrementTimer: () => {
      dispatch(updateTimer());
    },
    gameplay: state.gameplay,
    resetTimer: () => {
      dispatch(resetTimer());
    },
    setPlayerStatus: (score, life) => {
      dispatch(setPlayerStatus(score, life));
    },
    setPlayMode: play => {
      dispatch(setPlayMode(play));
    },
    logout,
    reduceEnergy,
  };
};

export default usePlayer;
