import React from "react";
import styles from "./../../Styles/firstPage.module.css";
import { useLanguage } from "../../Hooks/Logic/useLanguage";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";

export default function FirstPage() {
  const { processModal } = useOpenAndCloseModal();
  const { t, language } = useLanguage();

  return (
    <div className={styles.container}>
      <section className={styles.welcomeSection}>
        <div
          className=" md:w-auto"
          style={{
            marginTop: 25,
          }}
        >
          <p
            className={`text-5xl md:text-7xl ${
              language === "en" ? styles.goalsEn : styles.goalsFa
            } `}
          >
            {t("goals")}
          </p>
        </div>
        <div
          className={`w-72 md:w-auto ${styles.improveContainer}`}
          style={{
            marginTop: 25,
          }}
        >
          <p
            style={{
              marginBottom: -2,
              marginTop: 10,
            }}
            className={`text-base md:text-xl ml-5 md:ml-0 ${styles.improve} ${
              language === "fn" && "text-4xl"
            }`}
          >
            {t("mainImproveText")}
          </p>
        </div>
        <div
          style={{
            marginTop: 25,
            display: "flex",
            justifyContent: "space-around",
          }}
          className={styles.btnContainer}
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
        </div>
      </section>
    </div>
  );
}
