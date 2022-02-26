import {
  useSetTypeOfAuthState,
  useTypeOfAuthState,
} from "../Context/Providers/TypeOfAuthState/TypeOfAuthProvider";

import { useLayoutEffect } from "react";
import { useSetModalShowingStateAndType } from "../Context/Providers/ModalShowingState/ModalShowingStateProvider";

export const useOpenAndCloseModal = (typeOfAuth) => {
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const setModalShowingState = useSetModalShowingStateAndType();
  const typeOfAuthState = useTypeOfAuthState();

  const processModal = (authType = typeOfAuth) => {
    if (authType !== null) {
      if (authType === "Login") setTypeOfAuthState("Login");
      else if (authType === "Signup") setTypeOfAuthState("Signup");
      else setTypeOfAuthState("ForgotPassword");
    } else {
      setTypeOfAuthState(null);
    }
  };

  useLayoutEffect(() => {
    if (typeOfAuthState === null) {
      setModalShowingState({
        modalType: null,
        isModalShowing: false,
      });
    } else
      setModalShowingState({
        modalType: typeOfAuthState,
        isModalShowing: true,
      });
  }, [typeOfAuthState]);
  return { processModal };
};
