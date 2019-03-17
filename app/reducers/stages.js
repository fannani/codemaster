const reducer = (
  state = {
    hasErrored: false,
    isLoading: false,
    stages: [],
    stage: {},
  },
  action,
) => {
  switch (action.type) {
    case 'STAGES_HAS_ERRORED':
      return Object.assign({ ...state }, { hasErrored: action.hasErrored });
    case 'STAGES_IS_LOADING':
      return Object.assign({ ...state }, { isLoading: action.isLoading });
    case 'STAGE_FETCH_DATA_SUCCESS':
      return Object.assign({ ...state }, { stage: action.stage });
    case 'ADD_STAGE_SUCCESS':
      return Object.assign(
        { ...state },
        { stages: [...state.stages, action.stage] },
      );

    default:
      return state;
  }
};

export default reducer;
