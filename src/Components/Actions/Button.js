import React from "react";

export default function Button({ disabledHandler, children, width }) {
  return (
    <button
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
