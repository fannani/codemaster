export const setPlayerStatus = (score, life) => ({
  type: 'SET_PLAYER_STATUS',
  score,
  life,
});

export const setPlayMode = play => ({
  type: 'SET_PLAY_MODE',
  play,
});

export const updateTimer = () => ({
  type: 'UPDATE_TIMER',
});

export const resetTimer = () => ({
  type: 'RESET_TIMER',
});