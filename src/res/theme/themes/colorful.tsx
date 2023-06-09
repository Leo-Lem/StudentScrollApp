import { createTheme } from "@mui/material"
import * as Color from "@mui/material/colors"

import base from "./base"

export default createTheme(base, {
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
})
