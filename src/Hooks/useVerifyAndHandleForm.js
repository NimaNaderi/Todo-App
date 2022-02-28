import { useEffect, useState } from "react";

import { hasEspecialCharacters } from "../Utilities/hasSpecialCharacters";

export const verifyForm = (userData) => {
  let { email, password } = userData;
  password === undefined && (password = "12345678");
  //* RegExp !
  const countOfAt = (email.match(/@/g) || []).length;
  let formatSpecialChar = /[.@]/;
  let acceptableProviders = /^(gmail|hotmail|yahoo|outlook)$/;
  const [beforeAt, afterAt] = email.split("@");
  const provider = afterAt?.split(".")[0];

  const isPasswordReady = () => {
    if (password.length < 8 || password === "" || password.includes(" "))
      return false;
    else return true;
  };

  const isEmailReady = () => {
    if (
      !email.includes(".com") ||
      email === "" ||
      !email.endsWith(".com") ||
      email.includes(" ") ||
      !email.includes("@") ||
      hasEspecialCharacters(email) ||
      formatSpecialChar.test(email.charAt(0)) ||
      beforeAt.includes("@") ||
      countOfAt > 1 ||
      !acceptableProviders.test(provider)
    )
      return false;
    else return true;
  };

  return {
    isEmailReady,
    isPasswordReady,
  };
};

export const useVerifyAndHandleForm = (userData) => {
  const { isEmailReady, isPasswordReady } = verifyForm(userData);
  const [readyToProcess, setReadyToProcess] = useState(false);
  const [error, setError] = useState(false);
  const verifyFormHandler = () => {
    if (userData || (userData.password !== null && userData.email !== null)) {
      if (!isEmailReady() || !isPasswordReady()) {
        setError(true);
        setReadyToProcess(false);
      } else {
        setError(false);
        setReadyToProcess(true);
      }
    }
  };

  useEffect(() => {
    verifyFormHandler();
  }, [userData]);

  return {
    error,
    readyToProcess,
    isEmailReady: () => isEmailReady(),
    isPasswordReady: () => isPasswordReady(),
  };
};
