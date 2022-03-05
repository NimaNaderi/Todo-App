import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { useLanguage } from "../../Hooks/useLanguage";

const useIsMouseOver = (margin) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const MainButtons = styled.button`
    transition: border-color 0.5s ease;
    animation-fill-mode: forward;
    position: absolute;
    padding: 3px;
    border-radius: 10px;
    border: 3px solid #444550;
    margin: 45px ${margin ? margin : 0} 0 ${margin ? margin : 0};
    width: 120px;
  `;

  return { isMouseOver, setIsMouseOver, MainButtons };
};

export default function MainButton({
  margin,
  children,
  buttonType,
  onClick,
  style,
}) {
  const { language, setLanguage, t } = useLanguage();
  const buttonRef = useRef();

  const { MainButtons, isMouseOver, setIsMouseOver } = useIsMouseOver(margin);

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
