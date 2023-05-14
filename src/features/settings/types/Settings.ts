import { Locale } from "../../../res/locale"
import { Theme } from "../../../res/theme"

export default interface Settings {
  theme: Theme
  locale: Locale
  isLocated: boolean
}
