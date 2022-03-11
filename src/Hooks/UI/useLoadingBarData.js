import {
  useLoading,
  useSetLoading,
} from "../../Context/Providers/LoadingBarState/LoadingBarStateProvider";

import { css } from "@emotion/react";
import { getCurrentLanguage } from "../../Utilities/getCurrentLanguage";

export const useLoadingBarData = (margin) => {
  const loading = useLoading();
  const setLoading = useSetLoading();
  const currentLanguage = getCurrentLanguage();
  const override = css`
    display: block;
    margin: 0 ${currentLanguage === "en" ? margin : 0} 0
      ${currentLanguage === "fa" ? margin : 0};
    //! position absolute Taken ! Must Be fixed On userAuth Form !
  `;

  return {
    loading,
    setLoading,
    loadingProps: { css: override, size: 20, color: "#fff", loading },
  };
};
