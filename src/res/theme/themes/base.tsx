import { createTheme } from "@mui/material"

import appBarSettings from "../settings/appBar"
import cardSettings from "../settings/card"
import linkSettings from "../settings/link"
import baselineSettings from "../settings/baseline"

export default createTheme(linkSettings, cardSettings, appBarSettings, baselineSettings)
