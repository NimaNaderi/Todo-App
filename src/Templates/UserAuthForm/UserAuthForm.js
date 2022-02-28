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
import { signUpUser } from "../../Services/RemoteService/Actions/signUpUser";
import styles from "./userAuthForm.module.css";
import { supabase } from "../../Services/RemoteService/Configuration/supabaseClient";
import { useFormFields } from "../../Hooks/useFormFields";
import { useLoadingBarData } from "../../Hooks/useLoadingBarData";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";
import { useVerifyAndHandleForm } from "../../Hooks/useVerifyAndHandleForm";

const useRenderByAuthType = () => {
  //Todo Redirect User When Logged In Or SignedUp !
  const { loadingProps, setLoading, loading } = useLoadingBarData("110px");
  const [serverErrorType, setServerErrorType] = useState(null);
  const typeOfAuthState = useTypeOfAuthState();
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const { processModal } = useOpenAndCloseModal();
  const { fields, handleChange } = useFormFields({
    email: "",
    password: "",
  });

  const handleAuth = () => {
    let renderValue;
    if (serverErrorType) {
      if (serverErrorType === "NoError") {
        if (typeOfAuthState === "Login") {
          renderValue = (
            <p style={{ color: "green" }}>Successfully LoggedIn !</p>
          );
        } else if (typeOfAuthState === "Signup") {
          renderValue = (
            <p style={{ color: "green" }}>Account Created Successfully !</p>
          );
        }
      } else {
        if (serverErrorType === "Login") {
          renderValue = (
            <p style={{ color: "red", margin: 0 }}>
              Please Check Your Credentials !
            </p>
          );
        } else if (serverErrorType === "Signup") {
          renderValue = (
            <p style={{ color: "red", margin: 0 }}>
              This Account Is Already Registered !
            </p>
          );
        }
      }
    }

    return (
      <div
        style={{
          width: 250,
          padding: 5,
          borderRadius: 8,
          background: "#fff",
          marginBottom: -20,
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {renderValue}
        {serverErrorType === "NoError" && (
          <p style={{ color: "green" }}>Redirecting To Main Page...</p>
        )}
      </div>
    );
  };

  const { readyToProcess, isEmailReady, isPasswordReady } =
    useVerifyAndHandleForm(fields);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (typeOfAuthState === "Login") {
      try {
        const { user, error } = await supabase.auth.signIn({
          email: fields.email,
          password: fields.password,
        });

        error ? setServerErrorType("Login") : setServerErrorType("NoError");

        setTimeout(() => {
          setServerErrorType(null);
        }, 3000);
      } catch (error) {}
    } else if (typeOfAuthState === "Signup") {
      try {
        const { user, error } = await signUpUser(fields.email, fields.password);

        error ? setServerErrorType("Signup") : setServerErrorType("NoError");

        setTimeout(() => {
          setServerErrorType(null);
        }, 3000);
      } catch (error) {}
    }
    setLoading(false);
  };

  const renderData = () => {
    return (
      <FormContentContainer onSubmit={submitFormHandler}>
        <div className={styles.container}>
          <DeleteButton />
          <h1 style={{ marginTop: 20 }}>
            {typeOfAuthState === "Login" ? "Login" : "Signup"}
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
            placeholder="Email"
            type={"email"}
          />
          <input
            onChange={(e) => handleChange(e)}
            name="Password"
            placeholder="Password"
            type={"password"}
          />
          {serverErrorType !== null && handleAuth()}
          <Button
            disabledHandler={
              !readyToProcess || serverErrorType === "NoError" || loading
            }
          >
            <ClipLoader {...loadingProps} />
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
