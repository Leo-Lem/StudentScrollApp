import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./en.json"

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    resources: {
      en: en
    }
  })

export default i18n