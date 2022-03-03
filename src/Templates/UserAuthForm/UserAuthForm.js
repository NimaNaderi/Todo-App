import React, { useEffect, useState } from "react";
import {
  useSetTypeOfAuthState,
  useTypeOfAuthState,
} from "../../Context/Providers/TypeOfAuthState/TypeOfAuthProvider";

import Button from "../../Components/Actions/Button";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteButton from "../../Components/DeleteButton/DeleteButton";
import FormContentContainer from "../../Components/FormContentContainer/FormContentContainer";
import Modal from "../Modal/Modal";
import { getCurrentLanguage } from "../../Utilities/getCurrentLanguage";
import styled from "styled-components";
import styles from "./userAuthForm.module.css";
import { t } from "i18next";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { useFormFields } from "../../Hooks/useFormFields";
import { useLoadingBarData } from "../../Hooks/useLoadingBarData";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";
import { useVerifyAndHandleForm } from "../../Hooks/useVerifyAndHandleForm";

//! Todo Put All Styled Components In External File !

const AuthDataContainer = styled.div`
  width: 250px;
  padding: 5px;
  border-radius: 8px;
  background: #fff;
  margin-bottom: -20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const useRenderByAuthType = () => {
  const { loadingProps, setLoading, loading } = useLoadingBarData("110px");
  const [serverErrorType, setServerErrorType] = useState(null);
  const typeOfAuthState = useTypeOfAuthState();
  const currentLanguage = getCurrentLanguage();
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const { processModal } = useOpenAndCloseModal();
  const { fields, handleChange } = useFormFields({
    email: "",
    password: "",
  });
  const authUser = useAuthUser(
    setLoading,
    typeOfAuthState,
    fields,
    setServerErrorType
  );

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

  const { readyToProcess, isEmailReady, isPasswordReady } =
    useVerifyAndHandleForm(fields);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    authUser();
  };

  const renderData = () => {
    return (
      <FormContentContainer onSubmit={submitFormHandler}>
        <div className={styles.container}>
          <DeleteButton />
          <h1 style={{ marginTop: 20 }}>
            {typeOfAuthState === "Login" ? t("login") : t("signUp")}
          </h1>
          {(fields.email.length > 0 || fields.password.length > 0) && (
            <div className={styles.dataVerificationContainer}>
              <p style={{ color: isEmailReady() ? "green" : "red" }}>
                {isEmailReady()
                  ? "Valid Email Provided !"
                  : "Please Provide A Valid Email !"}
              </p>
              <p
                style={{
                  color: isPasswordReady() ? "green" : "red",
                }}
              >
                {isPasswordReady()
                  ? "Valid Password Provided !"
                  : `Password Must Be AtLeast 8 Characters | ${fields.password.length} /
              8`}
              </p>
            </div>
          )}
          <input
            onChange={(e) => handleChange(e)}
            name="Email"
            placeholder={t("email")}
            type={"email"}
          />
          <input
            onChange={(e) => handleChange(e)}
            name="Password"
            placeholder={t("password")}
            type={"password"}
          />
          {serverErrorType !== null && handleAuth()}
          <Button
            disabledHandler={
              !readyToProcess || serverErrorType === "NoError" || loading
            }
          >
            {currentLanguage === "en" && <ClipLoader {...loadingProps} />}
            {typeOfAuthState === "Login" ? t("login") : t("signUp")}
            {currentLanguage === "fa" && <ClipLoader {...loadingProps} />}
          </Button>

          <p
            onClick={() =>
              typeOfAuthState === "Login"
                ? setTypeOfAuthState("Signup")
                : setTypeOfAuthState("Login")
            }
            style={{ marginTop: 40 }}
          >
            {typeOfAuthState === "Login" ? t("noAccount") : t("haveAccount")}
          </p>
          {typeOfAuthState === "Login" && (
            <p onClick={() => processModal("ForgotPassword")}>
              {t("forgetPassword")}
            </p>
          )}
        </div>
      </FormContentContainer>
    );
  };
  return <>{renderData()}</>;
};

export default function UserAuthForm(props) {
  return (
    <>
      <Modal onClose={props.onClose}>{useRenderByAuthType()}</Modal>
    </>
  );
}
