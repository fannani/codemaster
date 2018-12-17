const reducer = (
  state = {
    hasErrored: false,
    isLoading: false,
    missions: [],
  },
  action,
) => {
  switch (action.type) {
    case 'MISSIONS_HAS_ERRORED':
      return { ...state, hasErrored: action.hasErrored };
    case 'MISSIONS_IS_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'MISSIONS_FETCH_DATA_SUCCESS':
      return Object.assign({ ...state }, { missions: action.missions });
    default:
      return state;
  }
};

export default reducer;
