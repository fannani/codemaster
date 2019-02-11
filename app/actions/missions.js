import axios from 'axios';
import { API_URL } from '../config/config';

export const missionsHasErrored = bool => ({
  type: 'MISSIONS_HAS_ERRORED',
  hasErrored: bool,
});

export const missionsIsLoading = bool => ({
  type: 'MISSIONS_IS_LOADING',
  isLoading: bool,
});
export const missionsFetchDataSuccess = missions => ({
  type: 'MISSIONS_FETCH_DATA_SUCCESS',
  missions,
});

export const getMissionsByStage = stageid => dispatch => {
  dispatch(missionsIsLoading(true));
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
                {
                    missions(stage:"${stageid}") {
                        _id,
                        quest,
                        score,
                        testcase
                    }
                }
            `,
    },
  })
    .then(response => {
      dispatch(missionsIsLoading(false));
      return response;
    })
    .then(response => response.data.data.missions)
    .then(missions => dispatch(missionsFetchDataSuccess(missions)))
    .catch(() => dispatch(missionsHasErrored(true)));
};
