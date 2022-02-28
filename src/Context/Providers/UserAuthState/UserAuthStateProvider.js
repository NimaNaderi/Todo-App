import React, { createContext, useContext, useReducer } from "react";
import { authStateInitialValue, authStateReducerFn } from "../../reducer";

const userAuthStateContext = createContext();
const dispatchUserAuthStateContext = createContext();

export const useUserAuthState = () => {
  const context = useContext(userAuthStateContext);
  return context;
};

export const useDispatchUserAuthState = () => {
  const context = useContext(dispatchUserAuthStateContext);
  return context;
};

export default function UserAuthStateProvider({ children }) {
  const [userAuthState, dispatchUserAuthState] = useReducer(
    authStateReducerFn,
    authStateInitialValue
  );
  return (
    <userAuthStateContext.Provider value={userAuthState}>
      <dispatchUserAuthStateContext.Provider value={dispatchUserAuthState}>
        {children}
      </dispatchUserAuthStateContext.Provider>
    </userAuthStateContext.Provider>
  );
}
