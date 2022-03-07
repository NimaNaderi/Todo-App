import React, { useState } from "react";
import {
  useModalShowingStateAndType,
  useSetModalShowingStateAndType,
} from "./Context/Providers/ModalShowingState/ModalShowingStateProvider";

import FirstPage from "./Templates/FirstPageComponents/FirstPage";
import ForgotPasswordForm from "./Templates/ForgotPasswordForm/ForgotPasswordForm";
import GuestAttentionForm from "./Templates/GuestAttentionForm/GuestAttentionForm";
import MainPageContainer from "./Components/MainComponent/MainPageContainer";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Templates/NotFound/NotFound";
import { Route } from "react-router-dom";
import Routes from "./Routes/Routes";
import UserAuthForm from "./Templates/UserAuthForm/UserAuthForm";
import styles from "./Styles/appContainer.module.css";

export default function AppContainer() {
  const modalShowingStateAndType = useModalShowingStateAndType();
  const setModalShowingStateAndType = useSetModalShowingStateAndType();

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
      <Navbar />
      <div style={{ height: "85%" }}>
        <Routes />
      </div>
    </>
  );
}
