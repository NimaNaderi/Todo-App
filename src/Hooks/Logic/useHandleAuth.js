import React from "react";
import { t } from "i18next";
import useLightBgDataContainer from "./../UI/useLightBgDataContainer";

export const useHandleAuth = (serverErrorType, typeOfAuthState) => {
  const LightBgDataContainer = useLightBgDataContainer();
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
      <LightBgDataContainer>
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
      </LightBgDataContainer>
    );
  };
  return handleAuth;
};
