import { ADD_LEVEL } from "../constants/action-types";
import {API_BASE} from "../config/config";
export const addLevels = level => ({
    type: ADD_LEVEL,
    payload: level
});

export const levelsHasErrored = bool => ({
        type: 'LEVELS_HAS_ERRORED',
        hasErrored: bool
});

export const levelsIsLoading = bool =>({
        type: 'LEVELS_IS_LOADING',
        isLoading: bool
});
export const levelsFetchDataSuccess = levels => ({
        type: 'LEVELS_FETCH_DATA_SUCCESS',
        levels
});


export const levelsFetchData = (url) => ((dispatch) => {
    dispatch(levelsIsLoading(true));
    fetch(`${API_BASE}levels`)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(levelsIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((levels) => dispatch(levelsFetchDataSuccess(levels)))
        .catch(() => dispatch(levelsHasErrored(true)));

});



