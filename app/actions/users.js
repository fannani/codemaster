import userService from '../services/userService';

export const login = (email, password) => dispatch => {
  const request = user => {
    return { type: 'LOGIN_REQUEST', user };
  };
  const success = user => {
    return { type: 'LOGIN_SUCCESS', user };
  };
  const failure = error => {
    return { type: 'LOGIN_FAILURE', error };
  };
  dispatch(request({ email }));
  return userService.login(email, password).then(
    user => {
      dispatch(success(user));
    },
    error => {
      dispatch(failure(error));
    },
  );
};

export const reduceEnergy = (userid, energy) => dispatch => {
  const request = user => {
    return { type: 'REDUCE_ENERGY_REQUEST', user };
  };
  const success = user => {
    return { type: 'REDUCE_ENERGY_SUCCESS', user };
  };
  const failure = error => {
    return { type: 'REDUCE_ENERGY_FAILURE', error };
  };
  return userService.reduceEnergy(userid, energy).then(
    player => {
      dispatch(success(player));
    },
    error => {
      dispatch(failure(error));
    },
  );
};
