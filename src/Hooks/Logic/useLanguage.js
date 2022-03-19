import { useEffect, useState } from "react";

import { localServiceActions } from "./../../Services/LocalService/localService";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(
    localServiceActions.getItem("Language")
      ? localServiceActions.getItem("Language")
      : "en"
  );

  useEffect(() => {
    console.log("changed");
    localServiceActions.setItem("Language", language);
    i18n.changeLanguage(localServiceActions.getItem("Language"));
  }, [language]);

  return { language, setLanguage, t };
};
