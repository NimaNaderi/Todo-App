import React, { useState } from "react";
import {
  useModalShowingState,
  useSetModalShowingState,
} from "../../Context/Providers/ModalShowingState/ModalShowingStateProvider";
import { useTypeOfAuthState } from "../../Context/Providers/TypeOfAuthState/TypeOfAuthProvider";
import Modal from "../Modal/Modal";

const useRenderByAuthType = () => {
  let renderedValue;
  const typeOfAuthState = useTypeOfAuthState();
  const setModalShowingState = useSetModalShowingState();

  if (typeOfAuthState === "Login") {
    renderedValue = (
      <>
        <p>Login Form</p>
      </>
    );
  } else {
    renderedValue = (
      <>
        <p>Signup Form</p>
      </>
    );
  }
  return <>{renderedValue}</>;
};

export default function UserAuthForm(props) {
  return <Modal onClose={props.onClose}>{useRenderByAuthType()}</Modal>;
}
