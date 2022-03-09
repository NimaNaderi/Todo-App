import AppContainer from "./AppContainer";
import { localServiceActions } from "./Services/LocalService/localService";
import styles from "./Styles/app.module.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localServiceActions.getItem("Language"));
  }, []);
  return (
    <div
      className={` ${styles.app} ${
        i18n.language === "fa" ? styles.fa : styles.en
      } `}
    >
      <AppContainer />
    </div>
  );
}

export default App;
