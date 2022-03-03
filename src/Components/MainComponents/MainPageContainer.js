import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useLayoutEffect } from "react";
import {
  isUserAuthenticated,
  localServiceActions,
} from "../../Services/LocalService/localService";

export default function MainPageContainer() {
  const navigate = useNavigate();
  const acceptableAccessTypes = /^(LoggedIn|Guest)$/;

  useEffect(() => {
    if (
      !acceptableAccessTypes.test(localServiceActions.getItem("userAccessType"))
    )
      !isUserAuthenticated ? navigate("/notFound") : navigate("/main");
  }, []);

  return <div>MainPageContainer</div>;
}
