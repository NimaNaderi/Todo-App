import React, { createContext, useContext, useState } from "react";

const IsMenuOpenContext = createContext();
const SetIsMenuOpenContext = createContext();

//! Custom Hooks To Make Using Easier !

export const useIsMenuOpen = () => {
  const context = useContext(IsMenuOpenContext);
  return context;
};

export const useSetIsMenuOpen = () => {
  const context = useContext(SetIsMenuOpenContext);
  return context;
};

export default function MenuStateProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
    <IsMenuOpenContext.Provider value={isMenuOpen}>
      <SetIsMenuOpenContext.Provider value={setIsMenuOpen}>
        {children}
      </SetIsMenuOpenContext.Provider>
    </IsMenuOpenContext.Provider>
  );
}
