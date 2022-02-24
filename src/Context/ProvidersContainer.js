import React from "react";
import ModalShowingStateProvider from "./Providers/ModalShowingState/ModalShowingStateProvider";
import TypeOfAuthProvider from "./Providers/TypeOfAuthState/TypeOfAuthProvider";

export default function ProvidersContainer({ children }) {
  return (
    <ModalShowingStateProvider>
      <TypeOfAuthProvider>{children}</TypeOfAuthProvider>
    </ModalShowingStateProvider>
  );
}
