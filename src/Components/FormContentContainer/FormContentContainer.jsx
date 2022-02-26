import React from "react";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function FormContentContainer({ children, onSubmit }) {
  return <Container onSubmit={onSubmit}>{children}</Container>;
}
