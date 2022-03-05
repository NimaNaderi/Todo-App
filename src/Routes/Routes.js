import { Navigate, useRoutes } from "react-router-dom";

import AppContainer from "../AppContainer";
import MainPageContainer from "../Components/MainComponent/MainPageContainer";
import NotFound from "../Templates/NotFound/NotFound";
import React from "react";
import { isUserAuthenticated } from "../Services/LocalService/localService";

export default function Routes() {
  return useRoutes([
    {
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
    { path: "/notFound", element: <NotFound /> },
    { path: "*", element: <NotFound /> },
  ]);
}
