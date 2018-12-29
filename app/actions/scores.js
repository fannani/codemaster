import axios from 'axios';
import { API_BASE } from '../config/config';

export const scoreHasErrored = bool => ({
  type: 'SCORE_HAS_ERRORED',
  hasErrored: bool,
});

export const scoreIsLoading = bool => ({
  type: 'SCORE_IS_LOADING',
  isLoading: bool,
});

export const addScoreSuccess = stage => ({
  type: 'ADD_SCORE_SUCCESS',
  stage,
});

export const addScore = (
  playerid,
  stageid,
  courseid,
  score,
  time,
  stars,
) => dispatch => {
  dispatch(scoreIsLoading(true));
  const promise = axios({
    url: API_BASE,
    method: 'post',
    data: {
      query: `
                mutation{
                    addScore(player:"${playerid}",course:"${courseid}",stage:"${stageid}",score:${score},time:${time},stars:[${stars}]){_id}}`,
    },
  })
    .then(response => {
      dispatch(scoreIsLoading(false));
      return response;
    })
    .then(response => response.data.data.addScore)
    .then(stage => {
      dispatch(addScoreSuccess(stage));
      return stage;
    })
    .catch(() => {
      dispatch(scoreHasErrored(true));
    });
  return promise;
};
