import { createTheme } from "@mui/material"

import appBarSettings from "../settings/appBarSettings"
import cardSettings from "../settings/cardSettings"
import linkSettings from "../settings/linkSettings"
import noScrollbarsSettings from "../settings/noScrollbars"

export default createTheme(linkSettings, cardSettings, appBarSettings, noScrollbarsSettings)
