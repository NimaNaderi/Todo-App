import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function FormContentContainer({
  children,
  onSubmit,
  onKeyDown,
}) {
  const { t, i18n } = useTranslation();

  return (
    <Container
      onKeyDown={onKeyDown}
      style={i18n.dir() == "rtl" ? { direction: "rtl" } : null}
      onSubmit={onSubmit}
    >
      {children}
    </Container>
  );
}
