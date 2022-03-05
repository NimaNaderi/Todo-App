import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import styled from "styled-components";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";

const Button = styled.button`
        background: #E60000;,
        borderRadius: 50%;
        width: 50px;
        height: 50px;
`;

export default function DeleteButton() {
  const { processModal } = useOpenAndCloseModal();
  return (
    <Button style={{ borderRadius: 10 }} onClick={() => processModal(null)}>
      <CancelIcon sx={{ width: 50, height: 50 }} />
    </Button>
  );
}
