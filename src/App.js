import AppContainer from "./AppContainer";
import Routes from "./Routes/Routes";
import styles from "./Styles/app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Routes />
      {/* <AppContainer /> */}
    </div>
  );
}

export default App;
