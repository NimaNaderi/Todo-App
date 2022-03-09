import DarkMode from "../../theme/DarkMode";
import MainButton from "../MainButton/MainButton";
import React from "react";
import { localServiceActions } from "../../Services/LocalService/localService";
import { t } from "i18next";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";

export default function Navbar() {
  const { processModal } = useOpenAndCloseModal();
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        height: "15%",
        width: "100%",
        backgroundColor:
          localServiceActions.getItem("userAccessType") && "#232323",
      }}
    >
      <section
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <DarkMode />
        <MainButton buttonType={"language"} style={{ marginLeft: 200 }} />
      </section>

      <section
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <MainButton
          onClick={() => processModal("Signup")}
          style={{ marginRight: 150, width: 100 }}
        >
          {t("signUp")}
        </MainButton>
        <button
          onClick={() => processModal("Login")}
          style={{ marginRight: 70 }}
        >
          {t("login")}
        </button>
      </section>
    </nav>
  );
}
