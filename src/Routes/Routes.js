import { Navigate, useRoutes } from "react-router-dom";

import FirstPage from "../Templates/FirstPageComponents/FirstPage";
import Main from "../Components/MainComponent/Main";
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
    {
      path: "/main",
      element: <MainPageContainer />,
    },
    { path: "/", element: <Navigate to={"/welcome"} /> },
    {
      path: "/welcome",
      element: isUserAuthenticated ? <Navigate to={"/main"} /> : <FirstPage />,
    },
    { path: "/notFound", element: <NotFound /> },
    { path: "*", element: <NotFound /> },
  ]);
}
