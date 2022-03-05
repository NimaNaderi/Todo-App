import styled from "styled-components";
import { useTheme } from "./useTheme";

const useLightBgDataContainer = (margin = "30px 0 0 0") => {
  const { theme } = useTheme();
  return styled.div`
    background: ${theme === "light" ? "#eee" : null};
    width: 260px;
    padding: 10px;
    border-radius: 15px;
    margin: ${margin};
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
};

export default useLightBgDataContainer;
