import { css } from "@emotion/react";
import { getCurrentLanguage } from "../../Utilities/getCurrentLanguage";
import { useState } from "react";

export const useLoadingBarData = (margin) => {
  const [loading, setLoading] = useState(false);
  const currentLanguage = getCurrentLanguage();
  const override = css`
    display: block;
    margin: 0 ${currentLanguage === "en" ? margin : 0} 0
      ${currentLanguage === "fa" ? margin : 0};
    position: absolute;
  `;

  return {
    loading,
    setLoading,
    loadingProps: { css: override, size: 20, color: "#fff", loading },
  };
};
