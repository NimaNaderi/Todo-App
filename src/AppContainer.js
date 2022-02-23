import styles from "./Styles/appContainer.module.css";
import React from "react";
import LeftSide from "./Components/MainComponents/LeftSide";
import FirstPage from "./Components/FirstPageComponents/FirstPage";

export default function AppContainer() {
  return (
    <div className={styles.container}>
      {/* <LeftSide /> */}
      <FirstPage />
    </div>
  );
}
