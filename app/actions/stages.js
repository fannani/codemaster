import {API_BASE} from "../config/config";
import axios from "axios";
import {addCourseSuccess, coursesHasErrored, coursesIsLoading} from "./courses";


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

export const addStageSuccess = stage => ({
    type: 'ADD_STAGE_SUCCESS',
    stage
})

export const updateStageSuccess = stage => ({
    type: 'UPDATE_STAGE_SUCCESS',
    stage
})



export const addStage = (title,time,course,teory) => ((dispatch) => {
    dispatch(stagesIsLoading(true));
    const promise = axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `
                mutation{
                    addStage(title:"${title}",time:"${time}",course:"${course}",teory:"${teory}"){
    		            _id,title,time,teory,course{_id}}}
            `
        }
    }).then((response) => {
        dispatch(stagesIsLoading(false));
        return response;
    })
        .then((response) => {
            return response.data.data.addStage
        })
        .then((stage) => {
            dispatch(addStageSuccess(stage))
            return stage;
        })
        .catch((err) => {
            dispatch(stagesHasErrored(true))
        });
    return promise;
});

export const updateStage = (id,title,teory,time)=>((dispatch)=>{
    dispatch(stagesIsLoading(true));

    const promise = axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `
                mutation{
                    updateStage(id:"${id}",title:"${title}",time:"${time}",teory:"${teory}"){
    		            _id,title,time,teory,course{_id}}}
            `
        }
    }).then((response) => {
        dispatch(stagesIsLoading(false));
        return response;
    })
        .then((response) => {
            return response.data.data.updateStage
        })
        .then((stage) => {
            dispatch(updateStageSuccess(stage))
            return stage;
        })
        .catch((err) => {
            console.log(err);
            dispatch(stagesHasErrored(true))
        });
    return promise;
})
export const stagesFetchData = () => ((dispatch) => {
    dispatch(stagesIsLoading(true));
    axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `{ stages{_id,title,time,teory,course {_id}}}`
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

export const getStageByIdCourse = (courseid) =>((dispatch)=> {
    dispatch(stagesIsLoading(true));
    axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `{ stages(course:"${courseid}"){_id,title,time,teory,course {_id}}}`
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
})
export const stageFetchOne = (id) => ((dispatch) => {
    dispatch(stagesIsLoading(true));
    const promise = axios({
        url: API_BASE,
        method: 'post',
        data: {
            query: `{ stages(_id:"${id}"){_id,title,time,teory,course {_id}}}`
        }
    }).then((response) => {
        dispatch(stagesIsLoading(false));
        return response;
    })
        .then((response) => {
            return response.data.data.stages[0]
        })
        .catch(() => dispatch(stagesHasErrored(true)));
    return promise;
});



