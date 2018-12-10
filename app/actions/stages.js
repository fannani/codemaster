import {API_BASE} from "../config/config";


export const stagesHasErrored = bool => ({
    type: 'STAGES_HAS_ERRORED',
    hasErrored: bool
});

export const stagesIsLoading = bool =>({
    type: 'STAGES_IS_LOADING',
    isLoading: bool
});
export const stagesFetchDataSuccess = stages => ({
    type: 'STAGES_FETCH_DATA_SUCCESS',
    stages
});


export const stagesFetchData = (id) => ((dispatch) => {
    dispatch(stagesIsLoading(true));
    fetch(`${API_BASE}stages/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(stagesIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((stages) => dispatch(stagesFetchDataSuccess(stages)))
        .catch(() => dispatch(stagesHasErrored(true)));

});



