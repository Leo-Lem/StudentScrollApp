import { createTheme } from "@mui/material"

import linkSettings from "../settings/linkSettings"
import * as Color from "@mui/material/colors"
import cardSettings from "../settings/cardSettings"
import appBarSettings from "../settings/appBarSettings"

export default createTheme(
  {
    palette: {
      mode: "light",
      common: {
        black: Color.grey[900],
        white: Color.grey[50]
      },
      primary: {
        main: Color.purple[500]
      },
      background: {
        default: Color.green[900],
        paper: Color.purple[500]
      },
      text: {
        primary: Color.common.white
      },
      action: {
        active: Color.green[500],
        selected: Color.green[500]
      },
      divider: Color.common.white
    }
  },
  linkSettings,
  cardSettings,
  appBarSettings
)
