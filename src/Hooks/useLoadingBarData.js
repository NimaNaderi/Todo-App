import { css } from "@emotion/react";
import { useState } from "react";

export const useLoadingBarData = (marginRight) => {
  const [loading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 ${marginRight} 0 0;
    position: absolute;
  `;

  return {
    loading,
    setLoading,
    loadingProps: { css: override, size: 20, color: "#fff", loading },
  };
};
