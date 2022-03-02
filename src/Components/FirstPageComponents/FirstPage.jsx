import React, { useEffect, useRef, useState } from "react";
import { borderBottom, flexbox } from "@mui/system";

import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { localServiceActions } from "../../Services/LocalService/localService";
import styles from "./../../Styles/firstPage.module.css";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";
import { useTranslation } from "react-i18next";

export default function FirstPage() {
  const { t, i18n } = useTranslation();
  const { processModal } = useOpenAndCloseModal();

  const [language, setLanguage] = useState(
    localServiceActions.getItem("Language")
      ? localServiceActions.getItem("Language")
      : "en"
  );
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    localServiceActions.setItem("Language", language);
    i18n.changeLanguage(localServiceActions.getItem("Language"));
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
          <h1 style={{ fontSize: 72 }}>{t("goals")}</h1>
          <p
            style={{
              marginBottom: -2,
              marginTop: 10,
              color: "#B8B8CD",
              fontSize: 20,
            }}
          >
            {t("mainImproveText")}
          </p>
          <ButtonGroup
            sx={{
              marginTop: 5,
              width: 370,
              display: flexbox,
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
            sx={{ color: "white" }}
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
