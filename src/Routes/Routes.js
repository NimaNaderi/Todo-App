import { Navigate, useRoutes } from "react-router-dom";
import {
  isUserAuthenticated,
  localServiceActions,
} from "../Services/LocalService/localService";

import AppContainer from "../AppContainer";
import FirstPage from "../Components/FirstPageComponents/FirstPage";
import MainPageContainer from "../Components/MainComponents/MainPageContainer";
import NotFound from "../Templates/NotFound/NotFound";
import React from "react";

export default function Routes() {
  return useRoutes([
    isUserAuthenticated && {
      path: "/main",
      element: <MainPageContainer />,
    },
    { path: "/", element: <Navigate to={"/welcome"} replace /> },
    {
      path: "/welcome",
      element: isUserAuthenticated ? (
        <Navigate to={"/main"} />
      ) : (
        <AppContainer />
      ),
    },
    { path: "*", element: <NotFound /> },
  ]);
}
