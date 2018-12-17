const reducer = (
  state = {
    currentTimer: 0,
  },
  action,
) => {
  switch (action.type) {
    case 'INCREMENT_TIMER':
      return Object.assign(
        { ...state },
        { currentTimer: state.currentTimer + 1 },
      );
    default:
      return state;
  }
};

export default reducer;
