import React, { createContext, useContext, useState } from "react";

const ModalShowingStateContext = createContext();
const SetModalShowingStateContext = createContext();

//! Custom Hooks To Make Using Easier !

export const useModalShowingState = () => {
  const context = useContext(ModalShowingStateContext);
  return context;
};

export const useSetModalShowingState = () => {
  const context = useContext(SetModalShowingStateContext);
  return context;
};

export default function ModalShowingStateProvider({ children }) {
  const [modalShowing, setIsModalShowing] = useState(false);

  return (
    <ModalShowingStateContext.Provider value={modalShowing}>
      <SetModalShowingStateContext.Provider value={setIsModalShowing}>
        {children}
      </SetModalShowingStateContext.Provider>
    </ModalShowingStateContext.Provider>
  );
}
