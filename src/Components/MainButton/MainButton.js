import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { useLanguage } from "./../../Hooks/Logic/useLanguage";

const useIsMouseOver = (marginRight, marginLeft) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const MainButtons = styled.button`
    transition: border-color 0.5s ease;
    animation-fill-mode: forward;
    position: absolute;
    padding: 3px;
    border-radius: 10px;
    border: 3px solid #444550;
    width: 120px;
  `;

  return { isMouseOver, setIsMouseOver, MainButtons };
};

export default function MainButton({ children, buttonType, onClick, style }) {
  const { language, setLanguage, t } = useLanguage();
  const buttonRef = useRef();

  const { MainButtons, isMouseOver, setIsMouseOver } = useIsMouseOver();

  useEffect(() => {
    isMouseOver && (buttonRef.current.style.borderColor = "#1976D2");
  }, [isMouseOver]);

  return (
    <MainButtons
      style={style}
      onClick={onClick}
      ref={buttonRef}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {buttonType === "language" ? (
        !isMouseOver ? (
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
        )
      ) : (
        [children]
      )}
    </MainButtons>
  );
}
