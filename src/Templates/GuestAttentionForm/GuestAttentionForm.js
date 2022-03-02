import { Button, ButtonGroup, Checkbox, checkboxClasses } from "@mui/material";
import React, { useState } from "react";

import DeleteButton from "../../Components/DeleteButton/DeleteButton";
import FormContentContainer from "../../Components/FormContentContainer/FormContentContainer";
import Modal from "../Modal/Modal";
import { localServiceActions } from "../../Services/LocalService/localService";
import { useNavigate } from "react-router-dom";

export default function GuestAttentionForm({ onClose }) {
  const navigate = useNavigate();

  const [readyToProcess, setReadyToProcess] = useState(false);
  return (
    <Modal onClose={onClose}>
      <FormContentContainer>
        <DeleteButton />
        <h1
          style={{
            padding: 5,
            marginTop: 50,
            color: "red",
            background: "#fff",
            width: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          Attention
        </h1>

        <h3
          style={{
            marginLeft: 15,
            color: "white",
            marginTop: 35,
            lineHeight: 2,
          }}
        >
          When Logging In As Guest Your Todo List Content Will Not Be Save And
          It Will Be Clear After Each Refresh So We Strongly Recommend You To
          Login And Save Your Data Permanently !
        </h3>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
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
              marginBottom: 25,
              marginRight: 10,
              padding: 0,
              boxSizing: "border-box",
              width: 25,
              height: 25,
            }}
          />
          <label style={{ fontSize: 24 }} htmlFor="attentionCheckBox">
            I Have Read The Section And I Accept The Consequences !
          </label>
        </section>
        <Button
          onClick={() => {
            navigate("/main");
            localServiceActions.setItem("userAccessType", "Guest");
          }}
          disabled={!readyToProcess}
          sx={{ color: "#fff", borderRadius: 2, marginTop: 3 }}
          variant="contained"
        >
          Continue
        </Button>
      </FormContentContainer>
    </Modal>
  );
}
