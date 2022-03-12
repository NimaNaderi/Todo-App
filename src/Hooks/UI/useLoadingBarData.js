import { css } from "@emotion/react";
import { getCurrentLanguage } from "../../Utilities/getCurrentLanguage";
import { useUiState } from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";

export const useLoadingBarData = (margin) => {
  const loading = useUiState().loading;
  const currentLanguage = getCurrentLanguage();
  const override = css`
    display: block;
    margin: 0 ${currentLanguage === "en" ? margin : 0} 0
      ${currentLanguage === "fa" ? margin : 0};
    position: absolute;
  `;

  return {
    loadingProps: { css: override, size: 20, color: "#fff" },
  };
};
