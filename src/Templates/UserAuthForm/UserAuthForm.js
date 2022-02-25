import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useModalShowingState,
  useSetModalShowingState,
} from "../../Context/Providers/ModalShowingState/ModalShowingStateProvider";
import {
  useSetTypeOfAuthState,
  useTypeOfAuthState,
} from "../../Context/Providers/TypeOfAuthState/TypeOfAuthProvider";

import CancelIcon from "@mui/icons-material/Cancel";
import Modal from "../Modal/Modal";
import styles from "./userAuthForm.module.css";
import { verifyForm } from "../../Utilities/verifyForm";

const useRenderByAuthType = () => {
  const typeOfAuthState = useTypeOfAuthState();
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const setModalShowingState = useSetModalShowingState();
  const [readyToProcess, setReadyToProcess] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({ email: null, password: null });

  const inputChangeHandler = (e) => {
    const { value } = e.target;
    setUserData({ ...userData, [e.target.name.toLowerCase()]: value });
  };

  useEffect(() => {
    if (userData && userData.password !== null && userData.email !== null) {
      if (verifyForm(userData)) {
        setError(true);
        setReadyToProcess(true);
      } else {
        setError(false);
        setReadyToProcess(false);
      }
    }
  }, [userData]);

  const submitFormHandler = (e) => {
    e.preventDefault();
  };

  const renderData = () => {
    return (
      <form onSubmit={submitFormHandler}>
        <div className={styles.container}>
          <button
            onClick={() => setModalShowingState(false)}
            style={{
              background: "#E60000",
              borderRadius: "50%",
              width: 50,
              height: 50,
            }}
          >
            <CancelIcon sx={{ width: 50, height: 50 }} />
          </button>
          <h1 style={{ marginTop: 20 }}>
            {typeOfAuthState === "Login" ? "Login" : "Signup"}
          </h1>
          <input
            type={"email"}
            onChange={inputChangeHandler}
            name="Email"
            placeholder="Email"
            required
          ></input>
          <input
            onChange={inputChangeHandler}
            name="Password"
            placeholder="Password"
            required
          ></input>
          <button
            disabled={readyToProcess}
            style={{ marginTop: 40, opacity: readyToProcess && "50%" }}
          >
            {typeOfAuthState === "Login" ? "Signin" : "Signup"}
          </button>
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
            <p>Forgot Your Password ? Click Here</p>
          )}
        </div>
      </form>
    );
  };
  return <>{renderData()}</>;
};

export default function UserAuthForm(props) {
  return <Modal onClose={props.onClose}>{useRenderByAuthType()}</Modal>;
}
