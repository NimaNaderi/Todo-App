import styles from "./Styles/appContainer.module.css";
import React, { useState } from "react";
import FirstPage from "./Components/FirstPageComponents/FirstPage";
import UserAuthForm from "./Templates/UserAuthForm/UserAuthForm";
import {
  useModalShowingState,
  useSetModalShowingState,
} from "./Context/Providers/ModalShowingState/ModalShowingStateProvider";

export default function AppContainer() {
  const modalShowingState = useModalShowingState();
  const setModalShowingState = useSetModalShowingState();

  return (
    <div className={styles.container}>
      {modalShowingState && (
        <UserAuthForm onClose={() => setModalShowingState(false)} />
      )}
      <FirstPage />
    </div>
  );
}
