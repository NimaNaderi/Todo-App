import ModalShowingStateProvider from "./Providers/ModalShowingState/ModalShowingStateProvider";
import React from "react";
import TypeOfAuthProvider from "./Providers/TypeOfAuthState/TypeOfAuthProvider";
import UserAuthStateProvider from "./Providers/UserAuthState/UserAuthStateProvider";

export default function ProvidersContainer({ children }) {
  return (
    <UserAuthStateProvider>
      <ModalShowingStateProvider>
        <TypeOfAuthProvider>{children}</TypeOfAuthProvider>
      </ModalShowingStateProvider>
    </UserAuthStateProvider>
  );
}
