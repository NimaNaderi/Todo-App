import React from "react";
import styles from "./../../Styles/firstPage.module.css";
import { useLanguage } from "../../Hooks/Logic/useLanguage";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";

export default function FirstPage() {
  const { processModal } = useOpenAndCloseModal();
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <section className={styles.welcomeSection}>
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
        <div
          style={{
            marginTop: 25,
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
        </div>
      </section>
    </div>
  );
}
