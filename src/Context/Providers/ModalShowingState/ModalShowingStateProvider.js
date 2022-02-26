import React, { createContext, useContext, useState } from "react";

const ModalShowingStateContext = createContext();
const SetModalShowingStateContext = createContext();

//! Custom Hooks To Make Using Easier !

export const useModalShowingStateAndType = () => {
  const context = useContext(ModalShowingStateContext);
  return context;
};

export const useSetModalShowingStateAndType = () => {
  const context = useContext(SetModalShowingStateContext);
  return context;
};

export default function ModalShowingStateProvider({ children }) {
  const [modalShowingStateAndType, setModalShowingStateAndType] = useState({
    modalType: null,
    isModalShowing: false,
  });

  return (
    <ModalShowingStateContext.Provider value={modalShowingStateAndType}>
      <SetModalShowingStateContext.Provider value={setModalShowingStateAndType}>
        {children}
      </SetModalShowingStateContext.Provider>
    </ModalShowingStateContext.Provider>
  );
}
