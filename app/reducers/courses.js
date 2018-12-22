const reducer = (
  state = {
    hasErrored: false,
    isLoading: false,
    courses: [],
  },
  action,
) => {
  switch (action.type) {
    case 'COURSES_HAS_ERRORED':
      return Object.assign({ ...state }, { hasErrored: action.hasErrored });
    case 'COURSES_IS_LOADING':
      return Object.assign({ ...state }, { isLoading: action.isLoading });
    case 'ADD_COURSE_SUCCESS':
      return Object.assign(
        { ...state },
        { courses: [...state.courses, action.course] },
      );
    default:
      return state;
  }
};

export default reducer;
