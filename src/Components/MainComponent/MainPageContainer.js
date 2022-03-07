import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useLayoutEffect } from "react";
import {
  isUserAuthenticated,
  localServiceActions,
} from "../../Services/LocalService/localService";

import Navbar from "../Navbar/Navbar";
import { useSetModalShowingStateAndType } from "../../Context/Providers/ModalShowingState/ModalShowingStateProvider";

export default function MainPageContainer() {
  const navigate = useNavigate();
  const acceptableAccessTypes = /^(LoggedIn|Guest)$/;
  const setModalShowingState = useSetModalShowingStateAndType();

  useEffect(() => {
    setModalShowingState({
      modalType: null,
      isModalShowing: false,
    });

    if (
      !acceptableAccessTypes.test(localServiceActions.getItem("userAccessType"))
    )
      !isUserAuthenticated ? navigate("/notFound") : navigate("/main");
  }, []);

  return <div></div>;
}
