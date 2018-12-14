import {API_BASE} from "../config/config";
import axios from "axios";


export const coursesHasErrored = bool => ({
        type: 'COURSES_HAS_ERRORED',
        hasErrored: bool
});

export const coursesIsLoading = bool =>({
        type: 'COURSES_IS_LOADING',
        isLoading: bool
});
export const coursesFetchDataSuccess = courses => ({
        type: 'COURSES_FETCH_DATA_SUCCESS',
        courses
});

export const addCourseSuccess = course => ({
    type: 'ADD_COURSE_SUCCESS',
    course
})

export const addCourse = (title,) => ((dispatch) => {
    dispatch(coursesIsLoading(true));
    axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `
                mutation{
                    addCourse(name:${name}, desc:${desc}) {
                        _id,
                        name,
                        desc,
                    }
                }
            `
        }
    }).then((response) => {
        dispatch(coursesIsLoading(false));
        return response;
    })
        .then((response) => {
            return response.data.data.addCourse
        })
        .then((courses) => dispatch(addCourseSuccess(course)))
        .catch(() => dispatch(coursesHasErrored(true)));
});


export const coursesFetchData = () => ((dispatch) => {
    dispatch(coursesIsLoading(true));
    axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `
                {
                    courses {
                        _id,
                        name
                    }
                }
            `
        }
    }).then((response) => {


        dispatch(coursesIsLoading(false));
        return response;
    })
        .then((response) => {
            return response.data.data.courses
        })
        .then((courses) => dispatch(coursesFetchDataSuccess(courses)))
        .catch(() => dispatch(coursesHasErrored(true)));


});



