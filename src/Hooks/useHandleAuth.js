import { AuthDataContainer } from "../Components/StyledComponents/AuthDataContainer";
import React from "react";
import { t } from "i18next";

export const useHandleAuth = (serverErrorType, typeOfAuthState) => {
  const handleAuth = () => {
    let renderValue;
    if (serverErrorType) {
      if (serverErrorType === "NoError") {
        if (typeOfAuthState === "Login") {
          renderValue = t("successfulLogin");
        } else if (typeOfAuthState === "Signup") {
          renderValue = t("successfulSignUp");
        }
      } else {
        if (serverErrorType === "Login") {
          renderValue = t("checkCredentials");
        } else if (serverErrorType === "Signup") {
          renderValue = t("alreadyRegistered");
        } else {
          renderValue = t("noInternet");
        }
      }
    }
    return (
      <AuthDataContainer>
        <p
          style={{
            margin: 0,
            color: serverErrorType === "NoError" ? "green" : "red",
          }}
        >
          {renderValue}
        </p>
        {serverErrorType === "NoError" && (
          <p style={{ marginTop: 10, color: "green" }}>{t("redirecting")}</p>
        )}
      </AuthDataContainer>
    );
  };
  return handleAuth;
};
