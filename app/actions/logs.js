import { API_BASE } from '../config/config';

export const logsHasErrored = bool => ({
  type: 'LOGS_HAS_ERRORED',
  hasErrored: bool
});

export const logsIsLoading = bool => ({
  type: 'LOGS_IS_LOADING',
  isLoading: bool
});
export const logsFetchDataSuccess = logs => ({
  type: 'LOGS_FETCH_DATA_SUCCESS',
  logs
});

export const logsFetchData = () => dispatch => {
  dispatch(logsIsLoading(true));
  fetch(`${API_BASE}logs`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(logsIsLoading(false));
      return response;
    })
    .then(response => response.json())
    .then(logs => {
      dispatch(logsFetchDataSuccess(logs));
    })
    .catch(() => dispatch(logsHasErrored(true)));
};
