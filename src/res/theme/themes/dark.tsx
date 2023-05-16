import { createTheme } from "@mui/material"

import linkSettings from "../settings/linkSettings"
import cardSettings from "../settings/cardSettings"
import appBarSettings from "../settings/appBarSettings"
import noScrollbarsSettings from "../settings/noScrollbars"

// TODO: figure out why base theme fucks up dark mode

export default createTheme(
  {
    palette: {
      mode: "dark"
    }
  },
  linkSettings,
  cardSettings,
  appBarSettings,
  noScrollbarsSettings
)
