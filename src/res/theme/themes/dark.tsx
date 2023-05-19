import { createTheme } from "@mui/material"

import linkSettings from "../settings/link"
import cardSettings from "../settings/card"
import appBarSettings from "../settings/appBar"
import baselineSettings from "../settings/baseline"

export default createTheme(
  {
    palette: {
      mode: "dark"
    }
  },
  linkSettings,
  cardSettings,
  appBarSettings,
  baselineSettings
)
