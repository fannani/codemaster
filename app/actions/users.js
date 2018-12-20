import userService from '../services/userService';

export const login = (email, password) => dispatch => {
  const request = (user) => { return { type: 'LOGIN_REQUEST', user } }
  const success = (user) => { return { type: 'LOGIN_SUCCESS', user } }
  const failure = (error) => { return { type: 'LOGIN_FAILURE', error } }
  dispatch(request({email}));
  return userService.login(email,password).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {

        dispatch(failure(error));
      }
    );


};