import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import locales from "./locales.json"

import en from "./translations/en.json"
import de from "./translations/de.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      de: de
    }
  })

export default i18n
export { locales }
export type Locale = typeof locales[number]

export { default as AppLocaleProvider } from "./AppLocaleProvider"