import {
  isUserAuthenticated,
  localServiceActions,
} from "../Services/LocalService/localService";

import { signInUser } from "../Services/RemoteService/Actions/signInUser";
import { signUpUser } from "../Services/RemoteService/Actions/signUpUser";
import { useNavigate } from "react-router-dom";

export const useAuthUser = (
  setLoading,
  typeOfAuthState,
  fields,
  setServerErrorType
) => {
  const navigate = useNavigate();
  const handleAuth = async () => {
    setLoading(true);

    if (typeOfAuthState === "Login") {
      try {
        const { user, error } = await signInUser(fields.email, fields.password);

        if (user) {
          localServiceActions.setItem("userAccessType", "LoggedIn");
          setServerErrorType("NoError");
          setTimeout(() => {
            navigate("/main");
          }, 3000);
        }
        error.status === 400
          ? setServerErrorType("Login")
          : setServerErrorType("Network");
      } catch (error) {}

      setTimeout(() => {
        setServerErrorType(null);
      }, 2999);
    } else if (typeOfAuthState === "Signup") {
      try {
        const { user, error } = await signUpUser(fields.email, fields.password);

        if (user) {
          localServiceActions.setItem("userAccessType", "LoggedIn");
          setServerErrorType("NoError");
          setTimeout(() => {
            navigate("/main");
          }, 3000);
        }

        error.status === 400
          ? setServerErrorType("Signup")
          : setServerErrorType("Network");
      } catch (error) {}
    }

    setTimeout(() => {
      setServerErrorType(null);
    }, 2999);

    setLoading(false);
  };

  return handleAuth;
};
