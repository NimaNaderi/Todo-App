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
import styles from "./userAuthForm.module.css";
import { t } from "i18next";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { useFormFields } from "../../Hooks/useFormFields";
import { useHandleAuth } from "../../Hooks/useHandleAuth";
import { useLoadingBarData } from "../../Hooks/useLoadingBarData";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";
import { useTheme } from "../../Hooks/useTheme";
import { useVerifyAndHandleForm } from "../../Hooks/useVerifyAndHandleForm";

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
  const { theme } = useTheme();

  const handleAuth = useHandleAuth(serverErrorType, typeOfAuthState);

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
            <div
              className={styles.dataVerificationContainer}
              style={{ background: theme === "light" ? "#eee" : null }}
            >
              <p style={{ color: isEmailReady() ? "green" : "red" }}>
                {isEmailReady() ? t("validEmail") : t("notValidEmail")}
              </p>
              <p
                style={{
                  color: isPasswordReady() ? "green" : "red",
                }}
              >
                {isPasswordReady()
                  ? t("validPassword")
                  : `${t("notValidPassword")} ${fields.password.length} /
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
            style={{ marginTop: 40, cursor: "pointer" }}
          >
            {typeOfAuthState === "Login" ? t("noAccount") : t("haveAccount")}
          </p>
          {typeOfAuthState === "Login" && (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => processModal("ForgotPassword")}
            >
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
