import ButtonGroup from "@mui/material/ButtonGroup";
import DarkMode from "../../theme/DarkMode";
import MainButton from "../../Components/MainButton/MainButton";
import React from "react";
import styles from "./../../Styles/firstPage.module.css";
import { useLanguage } from "../../Hooks/Logic/useLanguage";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";

export default function FirstPage() {
  const { processModal } = useOpenAndCloseModal();
  const { language, setLanguage, t } = useLanguage();

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
