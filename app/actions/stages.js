import axios from 'axios';
import { API_BASE } from '../config/config';

export const stagesHasErrored = bool => ({
  type: 'STAGES_HAS_ERRORED',
  hasErrored: bool,
});

export const stagesIsLoading = bool => ({
  type: 'STAGES_IS_LOADING',
  isLoading: bool,
});

export const addStageSuccess = stage => ({
  type: 'ADD_STAGE_SUCCESS',
  stage,
});

export const updateStageSuccess = stage => ({
  type: 'UPDATE_STAGE_SUCCESS',
  stage,
});

export const stageFetchDataSuccess = stage => ({
  type: 'STAGE_FETCH_DATA_SUCCESS',
  stage,
});

export const addStage = (title, time, course, teory) => dispatch => {
  dispatch(stagesIsLoading(true));
  const promise = axios({
    url: API_BASE,
    method: 'post',
    data: {
      query: `
                mutation{
                    addStage(title:"${title}",time:"${time}",course:"${course}",teory:"${teory}"){_id,title,time,teory,course{_id}}}`,
    },
  })
    .then(response => {
      dispatch(stagesIsLoading(false));
      return response;
    })
    .then(response => response.data.data.addStage)
    .then(stage => {
      dispatch(addStageSuccess(stage));
      return stage;
    })
    .catch(() => {
      dispatch(stagesHasErrored(true));
    });
  return promise;
};

export const updateStage = (id, title, teory, time) => dispatch => {
  dispatch(stagesIsLoading(true));

  const promise = axios({
    url: API_BASE,
    method: 'post',
    data: {
      query: `
                mutation{
                    updateStage(id:"${id}",title:"${title}",time:"${time}",teory:"${teory}"){_id,title,time,teory,course{_id}}
                 }`,
    },
  })
    .then(response => {
      dispatch(stagesIsLoading(false));
      return response;
    })
    .then(response => response.data.data.updateStage)
    .then(stage => {
      dispatch(updateStageSuccess(stage));
      return stage;
    })
    .catch(err => {
      console.log(err);
      dispatch(stagesHasErrored(true));
    });
  return promise;
};

export const stageFetchOne = id => dispatch => {
  dispatch(stagesIsLoading(true));
  const promise = axios({
    url: API_BASE,
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
