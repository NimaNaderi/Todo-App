import { ChakraProvider } from "@chakra-ui/react";
import LoadingBarStateProvider from "./Providers/LoadingBarState/LoadingBarStateProvider";
import MenuStateProvider from "./Providers/MenuState/MenuStateProvider";
import ModalShowingStateProvider from "./Providers/ModalShowingState/ModalShowingStateProvider";
import React from "react";
import TypeOfAuthProvider from "./Providers/TypeOfAuthState/TypeOfAuthProvider";
import UserAuthStateProvider from "./Providers/UserAuthState/UserAuthStateProvider";

export default function ProvidersContainer({ children }) {
  return (
    <ChakraProvider>
      <LoadingBarStateProvider>
        <UserAuthStateProvider>
          <MenuStateProvider>
            <ModalShowingStateProvider>
              <TypeOfAuthProvider>{children}</TypeOfAuthProvider>
            </ModalShowingStateProvider>
          </MenuStateProvider>
        </UserAuthStateProvider>
      </LoadingBarStateProvider>
    </ChakraProvider>
  );
}
