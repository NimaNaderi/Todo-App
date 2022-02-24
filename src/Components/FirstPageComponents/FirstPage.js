import { Button } from "@mui/material";
import React, { useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";

import styles from "./../../Styles/firstPage.module.css";
import { flexbox } from "@mui/system";
import { useSetModalShowingState } from "../../Context/Providers/ModalShowingState/ModalShowingStateProvider";
import { useSetTypeOfAuthState } from "../../Context/Providers/TypeOfAuthState/TypeOfAuthProvider";

export default function FirstPage() {
  const setTypeOfAuthState = useSetTypeOfAuthState();
  const setModalShowingState = useSetModalShowingState();

  const openModalHandler = (typeOfAuth) => {
    if (typeOfAuth === "Login") setTypeOfAuthState("Login");
    else setTypeOfAuthState("Signup");
    setModalShowingState(true);
  };

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
              onClick={() => openModalHandler("Login")}
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
                marginLeft: -90,
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
            onClick={() => openModalHandler("Login")}
            sx={{ color: "white" }}
            variant="text"
          >
            Log in
          </Button>
          <Button
            onClick={() => openModalHandler("Signup")}
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
