import React from "react";

export default function Button({ disabledHandler, children }) {
  return (
    <button
      disabled={disabledHandler}
      style={{ marginTop: 40, opacity: disabledHandler && "50%" }}
    >
      {children}
    </button>
  );
}
