import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useLayoutEffect } from "react";
import {
  isUserAuthenticated,
  localServiceActions,
} from "../../Services/LocalService/localService";

export default function MainPageContainer() {
  //Todo Add Guest Login Feature !
  const navigate = useNavigate();
  const regex = /^(LoggedIn|Guest)$/;
  useEffect(() => {
    console.log(regex.test(localServiceActions.getItem("userAccessType")));
    if (!regex.test(localServiceActions.getItem("userAccessType")))
      !isUserAuthenticated ? navigate("/notFound") : navigate("/main");
  }, []);
  return <div>MainPageContainer</div>;
}
