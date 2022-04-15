export const UI_STATE_TYPES = {
  error: "error",
  loading: "loading",
  searchedText: "searchedText",
  capsLockStatus: "capsLockStatus",
};

export const uiInitialState = {
  error: false,
  loading: false,
  searchedText: "",
  capsLockStatus: null,
};

export const reducerFn = (state, action) => {
  switch (action.type) {
    case UI_STATE_TYPES.error:
      return { ...state, error: action.payload };
    case UI_STATE_TYPES.loading:
      return { ...state, loading: action.payload };
    case UI_STATE_TYPES.searchedText:
      return { ...state, searchedText: action.payload };
    case UI_STATE_TYPES.capsLockStatus:
      return { ...state, capsLockStatus: action.payload };
    default:
      return state;
  }
};
