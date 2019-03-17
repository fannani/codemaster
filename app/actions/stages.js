import axios from 'axios';
import { API_URL } from '../config/config';

export const stagesHasErrored = bool => ({
  type: 'STAGES_HAS_ERRORED',
  hasErrored: bool,
});

export const stagesIsLoading = bool => ({
  type: 'STAGES_IS_LOADING',
  isLoading: bool,
});

export const stageFetchDataSuccess = stage => ({
  type: 'STAGE_FETCH_DATA_SUCCESS',
  stage,
});

export const stageFetchOne = id => dispatch => {
  dispatch(stagesIsLoading(true));
  const promise = axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `{ stages(_id:"${id}"){_id,title,time,teory,course {_id}}}`,
    },
  })
    .then(response => {
      dispatch(stagesIsLoading(false));
      return response;
    })
    .then(response => response.data.data.stages[0])
    .then(stage => dispatch(stageFetchDataSuccess(stage)))
    .catch(() => dispatch(stagesHasErrored(true)));
  return promise;
};
