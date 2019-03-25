const reducer = (
  state = {
    life: 0,
    score: 0,
    play: false,
  },
  action,
) => {
  switch (action.type) {
    case 'RESET_TIMER':
      return Object.assign(
        { ...state },
        { currentTimer: 0, timerText: '00:00' },
      );
    case 'SET_PLAYER_STATUS':
      const { life, score } = action;
      return Object.assign({ ...state }, { life, score });
    case 'SET_PLAY_MODE':
      const { play } = action;
      return Object.assign({ ...state }, { play });
    default:
      return state;
  }
};

export default reducer;
