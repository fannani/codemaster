
import {API_BASE} from "../config/config";

export const missionsHasErrored = bool => ({
    type: 'MISSIONS_HAS_ERRORED',
    hasErrored: bool
});

export const missionsIsLoading = bool =>({
    type: 'MISSIONS_IS_LOADING',
    isLoading: bool
});
export const missionsFetchDataSuccess = missions => ({
    type: 'MISSIONS_FETCH_DATA_SUCCESS',
    missions
});




export const missionsFetchData = (id) => ((dispatch) => {
    dispatch(missionsIsLoading(true));
    fetch(`${API_BASE}missions/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(missionsIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((missions) => {
            dispatch(missionsFetchDataSuccess(missions))
        })
        .catch(() => dispatch(missionsHasErrored(true)));

});



