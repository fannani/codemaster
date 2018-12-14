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
export const coursesIsFinish = bool => ({
    type: 'COURSES_IS_FINISH',
    isFinish: bool
})
export const coursesFetchDataSuccess = courses => ({
        type: 'COURSES_FETCH_DATA_SUCCESS',
        courses
});

export const addCourseSuccess = course => ({
    type: 'ADD_COURSE_SUCCESS',
    course
})

export const addCourse = (name,desc) => ((dispatch) => {
    dispatch(coursesIsLoading(true));
    axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `
                mutation{
                    addCourse(name:"${name}", desc:"${desc}") {
                        _id,
                        name,
                        desc
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
        .then((course) => {
            dispatch(coursesIsFinish(true));
            dispatch(addCourseSuccess(course))
        })
        .catch((err) => {
            dispatch(coursesHasErrored(true))
        });
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



