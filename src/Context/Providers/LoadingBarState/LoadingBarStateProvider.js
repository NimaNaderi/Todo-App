import { createContext, useContext, useReducer, useState } from "react";
import { reducerFn, uiInitialState } from "../../uiStateReducer";

const uiStateContext = createContext();
const dispatchUiStateContext = createContext();

//! Custom Hooks To Make Using Easier !

export const useUiState = () => {
  const context = useContext(uiStateContext);
  return context;
};

export const useDispatchUiState = () => {
  const context = useContext(dispatchUiStateContext);
  return context;
};

export default function UiStateProvider({ children }) {
  const [uiState, dispatchUiState] = useReducer(reducerFn, uiInitialState);
  return (
    <uiStateContext.Provider value={uiState}>
      <dispatchUiStateContext.Provider value={dispatchUiState}>
        {children}
      </dispatchUiStateContext.Provider>
    </uiStateContext.Provider>
  );
}
