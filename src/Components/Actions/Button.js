import React from "react";
import styles from "./../../Templates/UserAuthForm/userAuthForm.module.css";

export default function Button({ disabledHandler, children, width }) {
  return (
    <button
      className={styles.actionBtn}
      disabled={disabledHandler}
      style={{
        width: width,
        marginTop: 40,
        opacity: disabledHandler && "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </button>
  );
}
