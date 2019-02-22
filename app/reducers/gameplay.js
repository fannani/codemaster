const reducer = (
  state = {
    currentTimer: 0,
    life: 0,
    score: 0,
    timerText: "00:00",
    play: false,
  },
  action,
) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
      return Object.assign(
        { ...state },
        { currentTimer: state.currentTimer + 1 },
      );
    case 'UPDATE_TIMER_TEXT':
      const { timerText } = action;
      return Object.assign(
        { ...state },
        { timerText },
      );
    case 'SET_PLAYER_STATUS':
      const { life, score } = action;
      return Object.assign(
        {...state},
        { life, score }
      )
    case 'SET_PLAY_MODE':
      const { play } = action;
      return Object.assign(
        {...state},
        { play }
      )
    default:
      return state;
  }
};

export default reducer;
