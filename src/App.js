import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useLayoutEffect } from "react";

import AppContainer from "./AppContainer";
import { ReactQueryDevtools } from "react-query/devtools";
import { localServiceActions } from "./Services/LocalService/localService";
import styles from "./Styles/app.module.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    console.log(location);
    i18n.changeLanguage(localServiceActions.getItem("Language"));
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className={` ${styles.app}`}>
        <AppContainer />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
}

export default App;
