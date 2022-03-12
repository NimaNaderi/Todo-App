import { localServiceActions } from "../../Services/LocalService/localService";
import { signInUser } from "../../Services/RemoteService/Actions/signInUser";
import { signUpUser } from "../../Services/RemoteService/Actions/signUpUser";
import { useDispatchUiState } from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthUser = (typeOfAuthState, fields, setServerErrorType) => {
  let timer;
  const dispatchUiState = useDispatchUiState();
  useEffect(() => {
    return () => {
      //! Cleaning Up The Timer !
      clearTimeout(timer);
    };
  }, []);
  const navigate = useNavigate();
  const handleAuth = async () => {
    dispatchUiState({ type: "loading", payload: true });
    let data;

    if (typeOfAuthState === "Login") {
      try {
        const { user, error } = await signInUser(fields.email, fields.password);
        data = user;
        console.log();
        data &&
          localServiceActions.setItem("uiInfo", {
            ...localServiceActions.getItem("uiInfo"),
            email: data.email,
          });
        error.status === 400
          ? setServerErrorType("Login")
          : setServerErrorType("Network");
      } catch (error) {}
    } else if (typeOfAuthState === "Signup") {
      try {
        const { user, error } = await signUpUser(fields.email, fields.password);
        data = user;
        user &&
          localServiceActions.setItem("uiInfo", {
            ...localServiceActions.getItem("uiInfo"),
            email: user.email,
          });

        error.status === 400
          ? setServerErrorType("Signup")
          : setServerErrorType("Network");
      } catch (error) {}
    }

    dispatchUiState({ type: "loading", payload: false });

    timer = setTimeout(() => {
      setServerErrorType(null);
    }, 2999);

    if (data) {
      localServiceActions.setItem("userAccessType", "LoggedIn");
      setServerErrorType("NoError");
      timer = setTimeout(() => {
        navigate("/main");
      }, 3000);
    }
  };

  return handleAuth;
};
