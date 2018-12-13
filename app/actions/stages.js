import {API_BASE} from "../config/config";
import axios from "axios";


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
    axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `
                {
                    stages {
                        _id,
                        title
                    }
                }
            `
        }
    }).then((response) => {


        dispatch(stagesIsLoading(false));
        return response;
    })
        .then((response) => {
            return response.data.data.stages
        })
        .then((stages) => dispatch(stagesFetchDataSuccess(stages)))
        .catch(() => dispatch(stagesHasErrored(true)));

});



