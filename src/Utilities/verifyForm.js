export const verifyForm = (userData) => {
  if (
    !userData.email.includes(".com") ||
    userData.password.length < 8 ||
    userData.email === "" ||
    userData.password === "" ||
    !userData.email.endsWith(".com") ||
    userData.email.includes(" ") ||
    userData.password.includes(" ") ||
    !userData.email.includes("@")
  )
    return true;
};
