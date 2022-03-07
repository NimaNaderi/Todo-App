import React, { useState } from "react";

import { Button } from "@mui/material";
import DeleteButton from "../../Components/DeleteButton/DeleteButton";
import FormContentContainer from "../../Components/FormContentContainer/FormContentContainer";
import Modal from "../Modal/Modal";
import { localServiceActions } from "../../Services/LocalService/localService";
import { t } from "i18next";
import useLightBgDataContainer from "../../Hooks/UI/useLightBgDataContainer";
import { useNavigate } from "react-router-dom";

export default function GuestAttentionForm({ onClose }) {
  const navigate = useNavigate();
  const LightBgDataContainer = useLightBgDataContainer();
  const [readyToProcess, setReadyToProcess] = useState(false);
  return (
    <Modal onClose={onClose}>
      <FormContentContainer>
        <DeleteButton />
        <LightBgDataContainer>
          <h1
            style={{
              color: "red",
            }}
          >
            {t("bigAttention")}
          </h1>
        </LightBgDataContainer>
        <h3
          style={{
            textAlign: "justify",
            marginLeft: 15,
            color: "white",
            marginTop: 20,
            lineHeight: 2,
            wordSpacing: 3,
          }}
        >
          {t("attention")}
        </h3>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <input
            onClick={(e) =>
              e.target.checked
                ? setReadyToProcess(true)
                : setReadyToProcess(false)
            }
            id="attentionCheckBox"
            type={"checkbox"}
            style={{
              marginBottom: 28,
              marginRight: 10,
              marginLeft: 10,
              width: 25,
              height: 25,
            }}
          />
          <label
            style={{ fontSize: 20, marginBottom: 6 }}
            htmlFor="attentionCheckBox"
          >
            {t("section")}
          </label>
        </section>
        <Button
          onClick={() => {
            navigate("/main", { replace: true });
            localServiceActions.setItem("userAccessType", "Guest");
          }}
          disabled={!readyToProcess}
          sx={{ color: "#fff", borderRadius: 2, marginTop: 3, width: 100 }}
          variant="contained"
        >
          {t("continue")}
        </Button>
      </FormContentContainer>
    </Modal>
  );
}
