
const reducer = (state = {
    hasErrored : false,
    isLoading : false,
    currentTimer : 0

},action) =>{
    switch (action.type) {
        case 'COURSE_HAS_ERRORED':
            return {...state ,hasErrored : action.hasErrored };
        case 'COURSE_IS_LOADING':
            return { ...state ,isLoading : action.isLoading };
        case 'COURSE_FETCH_DATA_SUCCESS':
            return Object.assign({...state},action.course);
        case 'INCREMENT_TIMER':
            return Object.assign(
                {...state},
                {currentTimer : state.currentTimer + 1}
            )
        default:
            return state;
    }
}

export default reducer;

