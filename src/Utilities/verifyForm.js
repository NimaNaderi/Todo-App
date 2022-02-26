import { useEffect, useState } from "react";

export const verifyForm = (userData) => {
  let { email, password } = userData;
  password === undefined && (password = "12345678");
  if (
    !email.includes(".com") ||
    password.length < 8 ||
    email === "" ||
    password === "" ||
    !email.endsWith(".com") ||
    email.includes(" ") ||
    password.includes(" ") ||
    !email.includes("@")
  )
    return true;
};

export const useVerifyForm = (userData) => {
  const [readyToProcess, setReadyToProcess] = useState(true);
  const [error, setError] = useState(false);
  const verifyFormHandler = () => {
    if (userData || (userData.password !== null && userData.email !== null)) {
      if (verifyForm(userData)) {
        setError(true);
        setReadyToProcess(true);
      } else {
        setError(false);
        setReadyToProcess(false);
      }
    }
  };

  useEffect(() => {
    verifyFormHandler();
  }, [userData]);

  return { error, readyToProcess };
};
