import { localServiceActions } from "../../Services/LocalService/localService";
import { signInUser } from "../../Services/RemoteService/Actions/signInUser";
import { signUpUser } from "../../Services/RemoteService/Actions/signUpUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthUser = (
  setLoading,
  typeOfAuthState,
  fields,
  setServerErrorType
) => {
  let timer;
  useEffect(() => {
    return () => {
      //! Cleaning Up The Timer !
      clearTimeout(timer);
    };
  }, []);
  const navigate = useNavigate();
  const handleAuth = async () => {
    setLoading(true);

    let data;

    if (typeOfAuthState === "Login") {
      try {
        const { user, error } = await signInUser(fields.email, fields.password);
        data = user;
        error.status === 400
          ? setServerErrorType("Login")
          : setServerErrorType("Network");
      } catch (error) {}
    } else if (typeOfAuthState === "Signup") {
      try {
        const { user, error } = await signUpUser(fields.email, fields.password);
        data = user;

        error.status === 400
          ? setServerErrorType("Signup")
          : setServerErrorType("Network");
      } catch (error) {}
    }

    setLoading(false);

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
