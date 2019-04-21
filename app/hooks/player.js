import { useContext } from 'react';
import AppContext from '../utils/context';
import UserService from '../services/UserService';
import PlayerService from '../services/PlayerService';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  ADD_ENERGY_FAILURE,
  ADD_ENERGY_REQUEST,
  ADD_ENERGY_SUCCESS,
  ADD_EXP_FAILURE,
  ADD_EXP_REQUEST,
  ADD_EXP_SUCCESS,
} from '../data/siswa/types';
import {
  setPlayerStatus,
  setPlayMode,
  updateTimer,
  resetTimer,
} from '../data/siswa/actions';

const usePlayer = () => {
  const [state, dispatch] = useContext(AppContext);

  const login = (email, password) => {
    const request = () => ({ type: LOGIN_REQUEST });
    const success = (user, isLogin) => ({
      type: LOGIN_SUCCESS,
      user,
      isLogin,
    });

    dispatch(request());
    return UserService.login(email, password, 'siswa').then(user => {
      let isLogin = false;
      if (user) {
        isLogin = true;
      }
      dispatch(success(user, isLogin));
      return user;
    });
  };

  const logout = () => {
    const request = () => ({ type: LOGOUT_REQUEST });
    const success = () => ({ type: LOGOUT_SUCCESS });
    dispatch(request());
    UserService.logout();
    dispatch(success());
  };

  const addEnergy = energy => {
    const userid = state.user.userdetail._id;
    const request = () => ({ type: ADD_ENERGY_REQUEST });
    const success = user => ({ type: ADD_ENERGY_SUCCESS, user });
    const failure = error => ({ type: ADD_ENERGY_FAILURE, error });
    dispatch(request());
    return PlayerService.addEnergy(userid, energy).then(
      player => {
        dispatch(success(player));
      },
      error => {
        dispatch(failure(error));
      },
    );
  };

  const addBadge = (badge) => {

  }

  const addExp = exp => {
    const userid = state.user.userdetail._id;
    const request = () => ({ type: ADD_EXP_REQUEST });
    const success = user => ({ type: ADD_EXP_SUCCESS, user });
    const failure = error => ({ type: ADD_EXP_FAILURE, error });
    dispatch(request());
    PlayerService.addExp(userid, exp).then(
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
    logout,
    addEnergy,
    addExp,
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
  };
};

export default usePlayer;
