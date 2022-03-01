import { signInUser } from "../Services/RemoteService/Actions/signInUser";
import { signUpUser } from "../Services/RemoteService/Actions/signUpUser";

export const useAuthUser = (
  setLoading,
  typeOfAuthState,
  fields,
  setServerErrorType
) => {
  const handleAuth = async () => {
    setLoading(true);

    if (typeOfAuthState === "Login") {
      try {
        const { user, error } = await signInUser(fields.email, fields.password);

        user && setServerErrorType("NoError");

        error.status === 400
          ? setServerErrorType("Login")
          : setServerErrorType("Network");
      } catch (error) {}

      setTimeout(() => {
        setServerErrorType(null);
      }, 3000);
    } else if (typeOfAuthState === "Signup") {
      try {
        const { user, error } = await signUpUser(fields.email, fields.password);

        user && setServerErrorType("NoError");

        error.status === 400
          ? setServerErrorType("Signup")
          : setServerErrorType("Network");
      } catch (error) {}
    }

    setTimeout(() => {
      setServerErrorType(null);
    }, 3000);

    setLoading(false);
  };

  return handleAuth;
};
