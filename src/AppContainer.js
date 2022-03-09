import React, { useState } from "react";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import {
  useModalShowingStateAndType,
  useSetModalShowingStateAndType,
} from "./Context/Providers/ModalShowingState/ModalShowingStateProvider";

import { Container } from "@chakra-ui/react";
import ForgotPasswordForm from "./Templates/ForgotPasswordForm/ForgotPasswordForm";
import GuestAttentionForm from "./Templates/GuestAttentionForm/GuestAttentionForm";
import Header from "./Components/Header/Header";
import Routes from "./Routes/Routes";
import UserAuthForm from "./Templates/UserAuthForm/UserAuthForm";

export default function AppContainer() {
  const modalShowingStateAndType = useModalShowingStateAndType();
  const setModalShowingStateAndType = useSetModalShowingStateAndType();

  const { toggleColorMode } = useColorMode();
  const headerSidBarBg = useColorModeValue("white", "#21212B");

  const MainBg = useColorModeValue("#f8fafd", "#181820");

  const renderValue = () => {
    if (
      modalShowingStateAndType.modalType === "Login" ||
      modalShowingStateAndType.modalType === "Signup"
    ) {
      return (
        <UserAuthForm
          onClose={() =>
            setModalShowingStateAndType({
              modalType: null,
              isModalShowing: false,
            })
          }
        />
      );
    } else if (modalShowingStateAndType.modalType === "ForgotPassword") {
      return (
        <ForgotPasswordForm
          onClose={() =>
            setModalShowingStateAndType({
              modalType: null,
              isModalShowing: false,
            })
          }
        ></ForgotPasswordForm>
      );
    } else if (modalShowingStateAndType.modalType === "Guest") {
      return (
        <GuestAttentionForm
          onClose={() =>
            setModalShowingStateAndType({
              modalType: null,
              isModalShowing: false,
            })
          }
        />
      );
    }
  };

  return (
    <>
      {renderValue()}
      <Container
        p="0"
        display="flex"
        maxW="container.1xl"
        height="full"
        flexDirection="column"
        bg={MainBg}
      >
        <Header
          headerSidBarBg={headerSidBarBg}
          BorderColorHeader={headerSidBarBg}
          toggleColorMode={toggleColorMode}
        />
        <Routes />
      </Container>
    </>
  );
}
