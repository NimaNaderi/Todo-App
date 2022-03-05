import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  return { theme, setTheme };
};
