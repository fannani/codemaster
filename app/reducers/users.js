const reducer = (state = {}, action) => {
  switch (action.type) {
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
