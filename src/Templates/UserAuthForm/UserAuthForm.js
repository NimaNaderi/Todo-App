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
  const { loadingProps, setLoading } = useLoadingBarData("110px");
  const [serverErrorType, setServerErrorType] = useState({
    type: null,
    hasError: false,
  });
  const typeOfAuthState = useTypeOfAuthState();
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const { processModal } = useOpenAndCloseModal();
  const { fields, handleChange } = useFormFields({
    email: "",
    password: "",
  });

  const handleSuccess = () => {
    let renderValue;
    if (serverErrorType === "NoError") {
      if (typeOfAuthState === "Login") {
        renderValue = (
          <>
            <p color="green">Successfully LoggedIn !</p>
            <p>Redirecting To Main Page...</p>
          </>
        );
      } else if (typeOfAuthState === "Signup") {
        renderValue = (
          <>
            <p color="green">Account Created Successfully !</p>
            <p>Redirecting To Main Page...</p>
          </>
        );
      }
    }
    return renderValue;
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

        console.log(error);

        error ? setServerErrorType("Login") : setServerErrorType("NoError");

        setTimeout(() => {
          setServerErrorType(null);
        }, 3000);

        // error
        //   ? console.log("Please Check Your Email Or Password !")
        //   : console.log("Successfully LoggedIn !");
      } catch (error) {}
    } else if (typeOfAuthState === "Signup") {
      try {
        const { user, error } = await signUpUser(fields.email, fields.password);

        error ? setServerErrorType("Signup") : setServerErrorType("NoError");

        setTimeout(() => {
          setServerErrorType({ type: null });
        }, 3000);
        error
          ? console.log("This Account Already Exists !")
          : console.log("Your Account Created Successfully !");
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
                  : `Password Must Be AtLeast 8 Charecters | ${fields.password.length} /
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
          {/* <p color="red">
            {serverErrorType === "Login"
              ? "Please Check Your Email Or Password !"
              : serverErrorType === "Signup"
              ? "This Account Already Exists !"
              : null}
          </p> */}
          {handleSuccess()}
          <Button
            disabledHandler={!readyToProcess || serverErrorType === "NoError"}
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
