import { createTheme } from "@mui/material"

import linkSettings from "../settings/linkSettings"
import cardSettings from "../settings/cardSettings"
import appBarSettings from "../settings/appBarSettings"

export default createTheme(
  {
    palette: {
      mode: "dark"
    }
  },
  linkSettings,
  cardSettings,
  appBarSettings
)
