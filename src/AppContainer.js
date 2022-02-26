import React, { useState } from "react";
import {
  useModalShowingStateAndType,
  useSetModalShowingState,
  useSetModalShowingStateAndType,
} from "./Context/Providers/ModalShowingState/ModalShowingStateProvider";

import FirstPage from "./Components/FirstPageComponents/FirstPage";
import ForgotPasswordForm from "./Templates/ForgotPasswordForm/ForgotPasswordForm";
import UserAuthForm from "./Templates/UserAuthForm/UserAuthForm";
import styles from "./Styles/appContainer.module.css";

export default function AppContainer() {
  const modalShowingStateAndType = useModalShowingStateAndType();
  const setModalShowingStateAndType = useSetModalShowingStateAndType();

  //Todo Complete ForgotPassword And Have Some Refactor

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
    }
  };

  return (
    <div className={styles.container}>
      {renderValue()}
      <FirstPage />
    </div>
  );
}
