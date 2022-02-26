import Button from "../../Components/Actions/Button";
import DeleteButton from "../../Components/DeleteButton/DeleteButton";
import FormContentContainer from "../../Components/FormContentContainer/FormContentContainer";
import Modal from "../Modal/Modal";
import React from "react";
import { useFormFields } from "../../Hooks/useFormFields";
import { useVerifyForm } from "../../Utilities/verifyForm";

export default function ForgotPasswordForm(props) {
  const { fields, handleChange } = useFormFields({ email: "" });
  const { error, readyToProcess } = useVerifyForm(fields);

  const submitFormHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Modal onClose={props.onClose}>
      <FormContentContainer onSubmit={submitFormHandler}>
        <DeleteButton />
        <input
          onChange={handleChange}
          type={"email"}
          name="Email"
          placeholder="Enter Your Email"
        ></input>
        <Button disabledHandler={readyToProcess}>Reset My Password</Button>
      </FormContentContainer>
    </Modal>
  );
}
