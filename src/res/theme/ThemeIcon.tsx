import { ComponentType } from "react"
import * as Icon from "@mui/icons-material"

import { Theme } from "."

export default {
  light: Icon.LightMode,
  dark: Icon.DarkMode,
  colorful: Icon.Palette,
  system: Icon.Settings,
} as { [key in Theme]: ComponentType<any> }