export const UI_STATE_TYPES = {
  error: "error",
  loading: "loading",
  shouldReRender: "shouldReRender",
};

export const uiInitialState = {
  error: false,
  loading: false,
  shouldReRender: false,
};

export const reducerFn = (state, action) => {
  switch (action.type) {
    case UI_STATE_TYPES.error:
      return { ...state, error: action.payload };
    case UI_STATE_TYPES.loading:
      return { ...state, loading: action.payload };
    case UI_STATE_TYPES.shouldReRender:
      console.log(state.shouldReRender);
      return { ...state, shouldReRender: action.payload };
    default:
      return state;
  }
};
