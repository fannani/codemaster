
import {API_BASE} from "../config/config";

export const courseHasErrored = bool => ({
    type: 'COURSE_HAS_ERRORED',
    hasErrored: bool
});

export const courseIsLoading = bool =>({
    type: 'COURSE_IS_LOADING',
    isLoading: bool
});
export const courseFetchDataSuccess = course => ({
    type: 'COURSE_FETCH_DATA_SUCCESS',
    course
});

export const incrementTimer = () => ({
    type : 'INCREMENT_TIMER'
})


export const courseFetchData = (id) => ((dispatch) => {
    dispatch(courseIsLoading(true));
    fetch(`${API_BASE}stage/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(courseIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((course) => {
            dispatch(courseFetchDataSuccess(course))

        })
        .catch(() => dispatch(courseHasErrored(true)));

});



