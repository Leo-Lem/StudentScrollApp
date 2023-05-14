import { createTheme } from "@mui/material"

import linkSettings from "../settings/linkSettings"
import cardSettings from "../settings/cardSettings"

export default createTheme(
  {
    palette: {
      mode: "light"
    }
  },
  linkSettings,
  cardSettings
)
