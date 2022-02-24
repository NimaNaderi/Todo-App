import React, { useState } from "react";
import { createContext, useContext } from "react";

const TypeOfAuthContext = createContext();
const SetTypeOfAuthContext = createContext();

export const useTypeOfAuthState = () => {
  const context = useContext(TypeOfAuthContext);
  return context;
};

export const useSetTypeOfAuthState = () => {
  const context = useContext(SetTypeOfAuthContext);
  return context;
};

export default function TypeOfAuthProvider({ children }) {
  const [typeOfAuth, setTypeOfAuth] = useState("");
  return (
    <TypeOfAuthContext.Provider value={typeOfAuth}>
      <SetTypeOfAuthContext.Provider value={setTypeOfAuth}>
        {children}
      </SetTypeOfAuthContext.Provider>
    </TypeOfAuthContext.Provider>
  );
}
