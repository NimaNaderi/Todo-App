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
import { useUiState } from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";
import { useVerifyAndHandleForm } from "../../Hooks/Logic/useVerifyAndHandleForm";

const useRenderByAuthType = () => {
  const { loadingProps } = useLoadingBarData("110px");
  const uiState = useUiState();
  const [serverErrorType, setServerErrorType] = useState(null);
  const typeOfAuthState = useTypeOfAuthState();
  const currentLanguage = getCurrentLanguage();
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const { processModal } = useOpenAndCloseModal();
  const { fields, handleChange } = useFormFields({
    email: "",
    password: "",
  });
  const authUser = useAuthUser(typeOfAuthState, fields, setServerErrorType);
  const LightBgDataContainer = useLightBgDataContainer();

  const handleAuth = useHandleAuth(serverErrorType, typeOfAuthState);

  const { readyToProcess, isEmailReady, isPasswordReady } =
    useVerifyAndHandleForm(fields);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    authUser();
  };

  const btnRef = useRef();

  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const enterKeyHandler = (e) => {
    const isButtonDisabled = btnRef.current.disabled;
    if (!isButtonDisabled && readyToProcess) e.which === 13 && authUser();
  };

  const renderData = () => {
    return (
      <FormContentContainer onSubmit={submitFormHandler}>
        <div onKeyDown={enterKeyHandler} className={styles.container}>
          <DeleteButton />
          <h1 style={{ marginTop: 20 }}>
            {typeOfAuthState === "Login" ? t("login") : t("signUp")}
          </h1>
          {(!isEmailReady() || !isPasswordReady() || isCapsLockOn) &&
            (fields.email.length > 0 || fields.password.length > 0) && (
              <LightBgDataContainer
                className={`${styles.dataVerificationContainer} w-full`}
              >
                <p style={{ color: isEmailReady() ? "green" : "red" }}>
                  {!isEmailReady() && t("notValidEmail")}
                </p>
                <p
                  className="px-4 mt-2 pb-2 ml-7 md:ml-0"
                  style={{
                    color: isPasswordReady() ? "green" : "red",
                  }}
                >
                  {!isPasswordReady() &&
                    `${t("notValidPassword")} ${fields.password.length} /
              8`}
                </p>
                {isCapsLockOn && <p>{t("capsLockOn")}</p>}
              </LightBgDataContainer>
            )}
          <input
            style={{ color: "black" }}
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
            style={{ color: "black" }}
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
            ref={btnRef}
            disabledHandler={
              !readyToProcess ||
              serverErrorType === "NoError" ||
              uiState.loading
            }
          >
            {currentLanguage === "en" && (
              <ClipLoader {...loadingProps} loading={uiState.loading} />
            )}
            {typeOfAuthState === "Login" ? t("login") : t("signUp")}
            {currentLanguage === "fa" && (
              <ClipLoader {...loadingProps} loading={uiState.loading} />
            )}
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
              style={{ cursor: "pointer", marginTop: 10 }}
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
