
const reducer = (state = {
    hasErrored : false,
    isLoading : false,
    levels : []
},action) =>{
    switch (action.type) {
        case 'LEVELS_HAS_ERRORED':
            return Object.assign(
                { ...state },
                { hasErrored : action.hasErrored },
            );
        case 'LEVELS_IS_LOADING':
            return Object.assign(
                { ...state },
                { isLoading : action.isLoading },
            );
        case 'LEVELS_FETCH_DATA_SUCCESS':
            return Object.assign(
                { ...state },
                { levels : action.levels},
            );
        default:
            return state;
    }
}

export default reducer;

