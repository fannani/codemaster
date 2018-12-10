
const reducer = (state = {
    hasErrored : false,
    isLoading : false,
    stages : []
},action) =>{
    switch (action.type) {
        case 'STAGES_HAS_ERRORED':
            return Object.assign(
                { ...state },
                { hasErrored : action.hasErrored },
            );
        case 'STAGES_IS_LOADING':
            return Object.assign(
                { ...state },
                { isLoading : action.isLoading },
            );
        case 'STAGES_FETCH_DATA_SUCCESS':
            return Object.assign(
                { ...state },
                { stages : action.stages},
            );
        default:
            return state;
    }
}

export default reducer;

