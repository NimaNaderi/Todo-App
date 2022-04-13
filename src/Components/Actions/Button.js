import React, { forwardRef } from "react";

import styles from "./../../Templates/UserAuthForm/userAuthForm.module.css";

function Button(props, ref) {
  return (
    <button
      ref={ref}
      className={styles.actionBtn}
      disabled={props.disabledHandler}
      style={{
        width: props.width,
        marginTop: 35,
        opacity: props.disabledHandler && "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </button>
  );
}

export default forwardRef(Button);
