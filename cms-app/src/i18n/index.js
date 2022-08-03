import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import es from "./es";
import de from "./de";
import ja from "./ja";
import zhTW from "./zhTW";
import zhCN from "./zhCN";

const resources = {
  en,
  de,
  es,
  ja,
  zhTW,
  zhCN,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});
