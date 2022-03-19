import {
  useDispatchUiState,
  useUiState,
} from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";

import Button from "../../Components/Actions/Button";
import ClipLoader from "react-spinners/ClipLoader";
import DeleteButton from "../../Components/DeleteButton/DeleteButton";
import FormContentContainer from "../../Components/FormContentContainer/FormContentContainer";
import Modal from "../Modal/Modal";
import React from "react";
import { supabase } from "../../Services/RemoteService/Configuration/supabaseClient";
import { t } from "i18next";
import { useFormFields } from "../../Hooks/Logic/useFormFields";
import { useLoadingBarData } from "../../Hooks/UI/useLoadingBarData";
import { useVerifyAndHandleForm } from "../../Hooks/Logic/useVerifyAndHandleForm";

export default function ForgotPasswordForm(props) {
  const { fields, handleChange } = useFormFields({ email: "" });
  let { readyToProcess } = useVerifyAndHandleForm(fields);
  const { loadingProps } = useLoadingBarData("190px");
  const loading = useUiState().loading;
  const dispatchUiState = useDispatchUiState();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    dispatchUiState({ type: "loading", payload: true });

    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      "nima.er.84@gmail.com"
    );

    // const token = localStorage.getItem("supabase.auth.token").currentSession
    //   .access_token;
    // console.log(token);

    // const {} = await supabase.auth.api.updateUser();

    dispatchUiState({ type: "loading", payload: false });
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
        <Button width={230} disabledHandler={!readyToProcess || loading}>
          <ClipLoader {...loadingProps} loading={loading} />
          {t("resetPassword")}
        </Button>
      </FormContentContainer>
    </Modal>
  );
}
