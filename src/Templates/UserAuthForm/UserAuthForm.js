import React, { useEffect, useState } from "react";
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
import { verifyForm } from "../../Utilities/verifyForm";

const useRenderByAuthType = () => {
  const typeOfAuthState = useTypeOfAuthState();
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const [readyToProcess, setReadyToProcess] = useState(true);
  const [error, setError] = useState(false);
  const { processModal } = useOpenAndCloseModal();
  const { fields, handleChange } = useFormFields({
    email: null,
    password: null,
  });

  useEffect(() => {
    console.log(fields);
    if (fields && fields.password !== null && fields.email !== null) {
      if (verifyForm(fields)) {
        setError(true);
        setReadyToProcess(true);
      } else {
        setError(false);
        setReadyToProcess(false);
      }
    }
  }, [fields]);

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
          <Button disabledHandler={readyToProcess}>
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
