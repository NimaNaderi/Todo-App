import Routes from "./Routes/Routes";
import styles from "./Styles/app.module.css";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  return (
    <div
      className={` ${styles.app} ${
        i18n.language === "fa" ? styles.fa : styles.en
      } `}
    >
      <Routes />
    </div>
  );
}

export default App;
