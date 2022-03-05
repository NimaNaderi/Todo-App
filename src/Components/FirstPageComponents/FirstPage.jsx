import { Button, createTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider, useTheme } from "@mui/material/";
import { amber, deepOrange, grey } from "@mui/material/colors";
import {
  getCurrentTheme,
  localServiceActions,
} from "../../Services/LocalService/localService";

import ButtonGroup from "@mui/material/ButtonGroup";
import DarkMode from "../../theme/DarkMode";
import MainButton from "../MainButton/MainButton";
import { dark } from "@mui/material/styles/createPalette";
import styles from "./../../Styles/firstPage.module.css";
import { useLanguage } from "../../Hooks/useLanguage";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default function FirstPage() {
  const { processModal } = useOpenAndCloseModal();
  const { language, setLanguage, t } = useLanguage();

  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <div className={styles.container}>
      <DarkMode />

      <MainButton buttonType={"language"} margin={"200px"} />
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
                color: "#fff",
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
                color: "#fff",
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
        <ButtonGroup style={{ marginTop: 45 }}>
          <button onClick={() => processModal("Login")} style={{ width: 90 }}>
            {t("login")}
          </button>
          <MainButton
            onClick={() => processModal("Signup")}
            margin={"100px"}
            style={{
              width: 100,
              marginTop: -5,
            }}
          >
            {t("signUp")}
          </MainButton>
        </ButtonGroup>
      </section>
    </div>
  );
}
