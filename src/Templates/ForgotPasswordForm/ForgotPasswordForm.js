import React, { useEffect } from "react";

import Button from "../../Components/Actions/Button";
import DeleteButton from "../../Components/DeleteButton/DeleteButton";
import FormContentContainer from "../../Components/FormContentContainer/FormContentContainer";
import Modal from "../Modal/Modal";
import { useFormFields } from "../../Hooks/useFormFields";

export default function ForgotPasswordForm(props) {
  const { fields, handleChange } = useFormFields("");
  useEffect(() => {
    console.log(fields);
  }, [fields]);
  const submitFormHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Modal onClose={props.onClose}>
      <FormContentContainer>
        <DeleteButton />
        <input
          onChange={handleChange}
          type={"email"}
          name="Email"
          placeholder="Enter Your Email"
        ></input>
        <Button>Reset My Password</Button>
      </FormContentContainer>
    </Modal>
  );
}
