import Button from "../../Components/Actions/Button";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteButton from "../../Components/DeleteButton/DeleteButton";
import FormContentContainer from "../../Components/FormContentContainer/FormContentContainer";
import Modal from "../Modal/Modal";
import React from "react";
import { supabase } from "../../Services/RemoteService/Configuration/supabaseClient";
import { t } from "i18next";
import { useFormFields } from "../../Hooks/useFormFields";
import { useLoadingBarData } from "../../Hooks/useLoadingBarData";
import { useVerifyAndHandleForm } from "../../Hooks/useVerifyAndHandleForm";

export default function ForgotPasswordForm(props) {
  const { fields, handleChange } = useFormFields({ email: "" });
  const { readyToProcess } = useVerifyAndHandleForm(fields);
  const { loadingProps, setLoading } = useLoadingBarData("190px");

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      "nima.er.84@gmail.com"
    );
    setLoading(false);
  };
  return (
    <Modal onClose={props.onClose}>
      <FormContentContainer onSubmit={submitFormHandler}>
        <DeleteButton />
        <input
          onChange={handleChange}
          type={"email"}
          name="Email"
          placeholder={t("enterEmail")}
        ></input>
        <Button width={230} disabledHandler={!readyToProcess}>
          <ClipLoader {...loadingProps} />
          {t("resetPassword")}
        </Button>
      </FormContentContainer>
    </Modal>
  );
}
