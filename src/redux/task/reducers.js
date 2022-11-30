const initialState = {
  task: [],
  isLoading: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "COUNT_DECRESE":
      return {
        ...state,
        count: state.count - 1,
      };
    case "GET_ALL_TASK":
      return {
        ...state,
        task: action.payload,
      };
    default:
      return state;
  }
};
