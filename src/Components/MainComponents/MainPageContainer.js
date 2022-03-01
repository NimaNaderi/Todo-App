import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useLayoutEffect } from "react";
import {
  isUserAuthenticated,
  localServiceActions,
} from "../../Services/LocalService/localService";

export default function MainPageContainer() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localServiceActions.getItem("userAccessType") !== ("LoggedIn" || "Guest")
    )
      !isUserAuthenticated ? navigate("/notFound") : navigate("/main");
  }, []);
  return <div>MainPageContainer</div>;
}
