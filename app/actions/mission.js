import { API_BASE } from '../config/config';
import axios from 'axios';
import {
  addStageSuccess,
  stagesFetchDataSuccess,
  stagesHasErrored,
  stagesIsLoading
} from './stages';

export const missionsHasErrored = bool => ({
  type: 'MISSIONS_HAS_ERRORED',
  hasErrored: bool
});

export const missionsIsLoading = bool => ({
  type: 'MISSIONS_IS_LOADING',
  isLoading: bool
});
export const missionsFetchDataSuccess = missions => ({
  type: 'MISSIONS_FETCH_DATA_SUCCESS',
  missions
});

export const addMissionSuccess = mission => ({
  type: 'ADD_MISSION_SUCCESS',
  mission
});

export const addMission = (stage, quest, testcase, score) => dispatch => {
  dispatch(missionsIsLoading(true));

  const promise = axios({
    url: API_BASE,
    method: 'post',
    data: {
      query: `
                mutation{
                    addMission(stage:"${stage}",quest:"${quest}",testcase:"${testcase}",score:${score}){
    		            _id,quest,score,stage{_id}}}
            `
    }
  })
    .then(response => {
      dispatch(missionsIsLoading(false));
      return response;
    })
    .then(response => {
      return response.data.data.addMission;
    })
    .then(stage => {
      dispatch(addMissionSuccess(mission));
      return mission;
    })
    .catch(err => {
      dispatch(missionsHasErrored(true));
    });
  return promise;
};
export const getMissionsByStage = stageid => dispatch => {
  dispatch(missionsIsLoading(true));
  axios({
    url: API_BASE,
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
            `
    }
  })
    .then(response => {
      dispatch(missionsIsLoading(false));
      return response;
    })
    .then(response => {
      return response.data.data.missions;
    })
    .then(missions => dispatch(missionsFetchDataSuccess(missions)))
    .catch(() => dispatch(missionsHasErrored(true)));
};
export const missionsFetchData = id => dispatch => {
  dispatch(missionsIsLoading(true));
  axios({
    url: API_BASE,
    method: 'post',
    data: {
      query: `
                {
                    missions {
                        _id,
                        title
                    }
                }
            `
    }
  })
    .then(response => {
      dispatch(missionsIsLoading(false));
      return response;
    })
    .then(response => {
      return response.data.data.missions;
    })
    .then(missions => dispatch(missionsFetchDataSuccess(missions)))
    .catch(() => dispatch(missionsHasErrored(true)));
};
