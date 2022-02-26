import React, { useEffect } from "react";
import {
  useSetTypeOfAuthState,
  useTypeOfAuthState,
} from "../../Context/Providers/TypeOfAuthState/TypeOfAuthProvider";

import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { flexbox } from "@mui/system";
import styles from "./../../Styles/firstPage.module.css";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";

export default function FirstPage() {
  // const openAndCloseModalHandler = useOpenAndCloseModal();
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const { processModal } = useOpenAndCloseModal();

  return (
    <div className={styles.container}>
      <section className={styles.welcomeSection}>
        <div className={styles.contentContainer}>
          <h1 style={{ fontSize: 72 }}>Goals, Just Goals.</h1>
          <p
            style={{
              marginBottom: -2,
              marginTop: 10,
              color: "#B8B8CD",
              fontSize: 20,
            }}
          >
            Improve Yourself By Doing These Tasks
          </p>
          <p style={{ color: "#B8B8CD", fontSize: 20 }}>
            And Reach To Your Goals Very Quick.
          </p>
          <ButtonGroup
            sx={{
              marginTop: 5,
              width: "100%",
              display: flexbox,
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={() => processModal("Login")}
              style={{ borderRadius: 10 }}
              className={styles.button}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(90deg, rgba(188,36,140,1) 0%, rgba(247,95,140,1) 100%);",
              }}
            >
              Get Started
            </Button>
            <Button
              style={{
                background: "#30303D",
                borderRadius: 10,
              }}
              className={styles.button}
              variant="contained"
            >
              Continue As Guest
            </Button>
          </ButtonGroup>
        </div>
      </section>
      <section className={styles.accountSection}>
        <ButtonGroup sx={{ color: "black" }} style={{ marginTop: 40 }}>
          <Button
            onClick={() => processModal("Login")}
            sx={{ color: "white" }}
            variant="text"
          >
            Log in
          </Button>
          <Button
            onClick={() => processModal("Signup")}
            sx={{ color: "white", borderColor: "#444550" }}
            variant="outlined"
            style={{ marginLeft: 15, borderRadius: 10, borderWidth: 3 }}
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </section>
    </div>
  );
}
