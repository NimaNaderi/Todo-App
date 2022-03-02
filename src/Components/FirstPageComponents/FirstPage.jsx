import React, { useEffect, useRef, useState } from "react";
import { borderBottom, flexbox } from "@mui/system";

import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { localServiceActions } from "../../Services/LocalService/localService";
import styles from "./../../Styles/firstPage.module.css";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";

export default function FirstPage() {
  const { processModal } = useOpenAndCloseModal();

  const [language, setLanguage] = useState("EN");
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    localServiceActions.setItem("Language", language);
  }, [language]);

  return (
    <div className={styles.container}>
      <Button
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        sx={{
          transition: "all .5s ease",
          position: "absolute",
          color: "white",
          borderColor: "#444550",
          borderRadius: 4,
        }}
        variant="outlined"
        style={{
          marginLeft: 50,
          marginTop: 40,
          borderWidth: 3,
          width: 120,
        }}
      >
        {!isMouseOver ? (
          "Language"
        ) : (
          <section
            style={{
              fontSize: 18,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={
                language === "EN"
                  ? { pointerEvents: "none", opacity: 0.3 }
                  : null
              }
              onClick={() => setLanguage("EN")}
            >
              EN
            </div>
            <div
              style={
                language === "FA"
                  ? { pointerEvents: "none", opacity: 0.3 }
                  : null
              }
              onClick={() => setLanguage("FA")}
            >
              FA
            </div>
          </section>
        )}
      </Button>
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
              onClick={() => processModal("Guest")}
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
