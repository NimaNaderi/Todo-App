import React, { useEffect, useRef, useState } from "react";
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
import { useAuthUser } from "../../Hooks/Logic/useAuthUser";
import { useFormFields } from "../../Hooks/Logic/useFormFields";
import { useHandleAuth } from "../../Hooks/Logic/useHandleAuth";
import useLightBgDataContainer from "../../Hooks/UI/useLightBgDataContainer";
import { useLoadingBarData } from "../../Hooks/UI/useLoadingBarData";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";
import { useVerifyAndHandleForm } from "../../Hooks/Logic/useVerifyAndHandleForm";

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
  const LightBgDataContainer = useLightBgDataContainer();

  const handleAuth = useHandleAuth(serverErrorType, typeOfAuthState);

  const { readyToProcess, isEmailReady, isPasswordReady } =
    useVerifyAndHandleForm(fields);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    authUser();
  };

  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const renderData = () => {
    return (
      <FormContentContainer onSubmit={submitFormHandler}>
        <div className={styles.container}>
          <DeleteButton />
          <h1 style={{ marginTop: 20 }}>
            {typeOfAuthState === "Login" ? t("login") : t("signUp")}
          </h1>
          {(fields.email.length > 0 || fields.password.length > 0) && (
            <LightBgDataContainer className={styles.dataVerificationContainer}>
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
              {isCapsLockOn && <p>{t("capsLockOn")}</p>}
            </LightBgDataContainer>
          )}
          <input
            onKeyDown={(e) => {
              e.getModifierState("CapsLock")
                ? setIsCapsLockOn(true)
                : setIsCapsLockOn(false);
            }}
            onChange={(e) => {
              handleChange(e);
            }}
            name="Email"
            placeholder={t("email")}
            type={"email"}
          />
          <input
            onKeyDown={(e) => {
              e.getModifierState("CapsLock")
                ? setIsCapsLockOn(true)
                : setIsCapsLockOn(false);
            }}
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
