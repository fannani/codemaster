
import {API_BASE} from "../config/config";
import axios from "axios";
import {stagesFetchDataSuccess, stagesHasErrored, stagesIsLoading} from "./stages";

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
    }).then((response) => {
        dispatch(missionsIsLoading(false));
        return response;
    })
        .then((response) => {
            return response.data.data.missions
        })
        .then((missions) => dispatch(missionsFetchDataSuccess(missions)))
        .catch(() => dispatch(missionsHasErrored(true)));

});



