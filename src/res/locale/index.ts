import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import locales from "./locales.json"

import en from "./translations/en.json"
import zh from "./translations/zh.json"
import de from "./translations/de.json"
import es from "./translations/es.json"

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: en,
    zh: zh,
    de: de,
    es: es
  }
})

export default i18n
export { locales }
export type Locale = (typeof locales)[number]

export { default as AppLocaleProvider } from "./AppLocaleProvider"
