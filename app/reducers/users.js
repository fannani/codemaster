const reducer = (
  state = { loggedIn: false, user: { userdetail: { energy: 0 } } },
  action,
) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user,
      };
    case 'REDUCE_ENERGY_SUCCESS':
      let userdetail = Object.assign(
        { ...state.user.userdetail },
        { energy: action.user.energy },
      );
      return Object.assign(
        { ...state },
        { user: Object.assign({ ...state.user }, { userdetail }) },
      );
    case 'LOGOUT_SUCCESS':
      return {};
    default:
      return state;
  }
};

export default reducer;
