
export const incrementTimer = () => (dispatch, getState) => {
  dispatch(updateTimer());
  const { currentTimer } = getState().gameplay;
  let sec = currentTimer;
  let min = 0;
  let secStr;
  let minStr;
  if (sec > 59) {
    min = Math.floor(sec / 60);
    sec %= 60;
  }
  if (sec < 10) {
    secStr = `0${sec}`;
  } else {
    secStr = sec;
  }
  if (min < 10) {
    minStr = `0${min}`;
  } else {
    minStr = min;
  }
  dispatch(updateTimerText(`${minStr}:${secStr}`));
}

export const updateTimer = () => ({
  type: 'UPDATE_TIMER'
})

export const resetTimer = () => ({
  type: 'RESET_TIMER',
});

export const setPlayerStatus = (score,life) => ({
  type: 'SET_PLAYER_STATUS',
  score, life,
});

export const setPlayMode = (play) => ({
  type: 'SET_PLAY_MODE',
  play
});

export const updateTimerText = (timerText) => ({
  type: 'UPDATE_TIMER_TEXT',
  timerText
})
