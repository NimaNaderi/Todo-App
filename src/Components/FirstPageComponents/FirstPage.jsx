import React, { useEffect, useRef, useState } from "react";

import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import DarkMode from "../../theme/DarkMode";
import styles from "./../../Styles/firstPage.module.css";
import { useLanguage } from "../../Hooks/useLanguage";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";

export default function FirstPage() {
  const { processModal } = useOpenAndCloseModal();
  const { language, setLanguage, t } = useLanguage();

  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <div className={styles.container}>
      <DarkMode />
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
          t("language")
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
                language === "en"
                  ? { pointerEvents: "none", opacity: 0.3 }
                  : null
              }
              onClick={() => setLanguage("en")}
            >
              EN
            </div>
            <div
              style={
                language === "fa"
                  ? { pointerEvents: "none", opacity: 0.3 }
                  : null
              }
              onClick={() => setLanguage("fa")}
            >
              FA
            </div>
          </section>
        )}
      </Button>
      <section className={styles.welcomeSection}>
        <div className={styles.contentContainer}>
          <p style={{ fontSize: 72 }}>{t("goals")}</p>
          <p
            style={{
              marginBottom: -2,
              marginTop: 10,
              fontSize: 20,
            }}
          >
            {t("mainImproveText")}
          </p>
          <ButtonGroup
            sx={{
              marginTop: 5,
              width: 370,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <button
              onClick={() => processModal("Login")}
              style={{
                borderRadius: 10,
                background:
                  "linear-gradient(90deg, rgba(188,36,140,1) 0%, rgba(247,95,140,1) 100%)",
              }}
              className={styles.button}
            >
              {t("getStarted")}
            </button>
            <button
              onClick={() => processModal("Guest")}
              style={{
                background: "#30303D",
                borderRadius: 10,
              }}
              className={styles.button}
              variant="contained"
            >
              {t("continueGuest")}
            </button>
          </ButtonGroup>
        </div>
      </section>
      <section className={styles.accountSection}>
        <ButtonGroup sx={{ color: "black" }} style={{ marginTop: 40 }}>
          <Button
            onClick={() => processModal("Login")}
            sx={{ color: "white", width: 90 }}
            variant="text"
          >
            {t("login")}
          </Button>
          <Button
            onClick={() => processModal("Signup")}
            sx={{ color: "white", borderColor: "#444550" }}
            variant="outlined"
            style={{
              marginLeft: 15,
              borderRadius: 10,
              borderWidth: 3,
              width: 100,
            }}
          >
            {t("signUp")}
          </Button>
        </ButtonGroup>
      </section>
    </div>
  );
}
