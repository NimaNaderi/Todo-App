import React, { useEffect } from "react";
import {
  useSetTypeOfAuthState,
  useTypeOfAuthState,
} from "../../Context/Providers/TypeOfAuthState/TypeOfAuthProvider";

import Button from "../../Components/Actions/Button";
import DeleteButton from "../../Components/DeleteButton/DeleteButton";
import FormContentContainer from "../../Components/FormContentContainer/FormContentContainer";
import Modal from "../Modal/Modal";
import styles from "./userAuthForm.module.css";
import { useFormFields } from "../../Hooks/useFormFields";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";
import { useVerifyAndHandleForm } from "../../Hooks/useVerifyAndHandleForm";

const useRenderByAuthType = () => {
  const typeOfAuthState = useTypeOfAuthState();
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const { processModal } = useOpenAndCloseModal();
  const { fields, handleChange } = useFormFields({
    email: "",
    password: "",
  });

  const { error, readyToProcess, isEmailReady, isPasswordReady } =
    useVerifyAndHandleForm(fields);

  const submitFormHandler = (e) => {
    e.preventDefault();
  };
  const renderData = () => {
    return (
      <FormContentContainer onSubmit={submitFormHandler}>
        <div className={styles.container}>
          <DeleteButton />
          <h1 style={{ marginTop: 20 }}>
            {typeOfAuthState === "Login" ? "Login" : "Signup"}
          </h1>
          {fields.email.length && (
            <div className={styles.dataVerificationContainer}>
              <p style={{ color: isEmailReady() ? "green" : "red" }}>
                Please Provide A Valid Email !
              </p>
              <p
                style={{
                  color: isPasswordReady() ? "green" : "red",
                }}
              >
                {isPasswordReady()
                  ? "Valid Password Provided !"
                  : `Password Must Be AtLeast 8 Charecters | ${fields.password.length} /
              8`}
                //Todo Fix The Length Bug And Add Show Box On Password Change
                Feature With Multi Operator !
              </p>
            </div>
          )}
          <input
            onChange={(e) => handleChange(e)}
            name="Email"
            placeholder="Email"
            type={"email"}
          />
          <input
            onChange={(e) => handleChange(e)}
            name="Password"
            placeholder="Password"
            type={"password"}
          />
          <Button disabledHandler={!readyToProcess}>
            {typeOfAuthState === "Login" ? "Signin" : "Signup"}
          </Button>
          <p
            onClick={() =>
              typeOfAuthState === "Login"
                ? setTypeOfAuthState("Signup")
                : setTypeOfAuthState("Login")
            }
            style={{ marginTop: 40 }}
          >
            {typeOfAuthState === "Login"
              ? "Does Not Have Account ? Create Now"
              : "Already Have Account ? Sign In"}
          </p>
          {typeOfAuthState === "Login" && (
            <p onClick={() => processModal("ForgotPassword")}>
              Forgot Your Password ? Click Here
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
