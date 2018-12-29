let user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { loggedIn: true, user }
  : { loggedIn: false, user: { userdetail: { energy: 0 } } };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user, 
      };
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user,
      };
    case 'LOGIN_FAILURE':
      return {};
    case 'REDUCE_ENERGY_SUCCESS':
      let userdetail = Object.assign(
        { ...state.user.userdetail },
        { energy: action.user.energy },
      );
      return Object.assign(
        { ...state },
        { user: Object.assign({ ...state.user }, { userdetail }) },
      );
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default reducer;
