import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("chakra-ui-color-mode")
  );
  return { theme, setTheme };
};
