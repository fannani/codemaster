import userService from '../services/userService';

export const login = (email, password) => dispatch => {
  const request = () => {
    return { type: 'LOGIN_REQUEST' };
  };
  const success = user => {
    return { type: 'LOGIN_SUCCESS', user };
  };
  dispatch(request());
  return userService.login(email, password).then(user => {
    dispatch(success(user));
    return user;
  });
};

export const logout = () => dispatch => {
  const request = () => {
    return { type: 'LOGOUT_REQUEST' };
  };
  const success = () => {
    return { type: 'LOGOUT_SUCCESS' };
  };
  const failure = () => {
    return { type: 'LOGOUT_FAILURE' };
  };
  dispatch(request());
  userService.logout();
  dispatch(success());
};

export const addPlayerAchievement = (
  player,
  achievement,
  star,
  point,
) => dispatch => {
  const request = () => {
    return { type: 'ADD_PLAYER_ACHIEVEMENT_REQUEST' };
  };
  const success = achievement => {
    return { type: 'ADD_PLAYER_ACHIEVEMENT_SUCCESS', achievement };
  };
  const failure = error => {
    return { type: 'ADD_PLAYER_ACHIEVEMENT_FAILURE', error };
  };
  dispatch(request());
  return userService
    .addPlayerAchievement(player, achievement, star, point)
    .then(
      player => {
        dispatch(success(player));
      },
      error => {
        dispatch(failure(error));
      },
    );
};

export const reduceEnergy = (userid, energy) => dispatch => {
  const request = () => {
    return { type: 'REDUCE_ENERGY_REQUEST' };
  };
  const success = user => {
    return { type: 'REDUCE_ENERGY_SUCCESS', user };
  };
  const failure = error => {
    return { type: 'REDUCE_ENERGY_FAILURE', error };
  };
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
