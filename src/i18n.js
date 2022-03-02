import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationFA from "./locales/fa/translation.json";

// Importing translation files

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  fa: {
    translation: translationFA,
  },
};
//i18N Initialization
i18n.use(initReactI18next).init({
  resources,
  lng: "en", //default language
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
