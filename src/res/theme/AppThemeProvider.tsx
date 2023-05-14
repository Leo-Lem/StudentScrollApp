import { ReactElement, ReactNode } from "react"
import { ThemeProvider } from "@emotion/react"
import { useMediaQuery } from "@mui/material"

import { useAppSelector } from "../../redux"

import dark from "./themes/dark"
import light from "./themes/light"
import colorful from "./themes/colorful"

export default function AppThemeProvider({ children }: Props): ReactElement {
  const theme = useAppSelector((state) => state.settings.settings?.theme)
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  switch (theme) {
    case undefined:
      return <ThemeProvider theme={prefersDarkMode ? dark : light}>{children}</ThemeProvider>
    case "dark":
      return <ThemeProvider theme={dark}>{children}</ThemeProvider>
    case "light":
      return <ThemeProvider theme={light}>{children}</ThemeProvider>
    case "colorful":
      return <ThemeProvider theme={colorful}>{children}</ThemeProvider>
    default:
      return <ThemeProvider theme={prefersDarkMode ? dark : light}>{children}</ThemeProvider>
  }
}

interface Props {
  children: ReactNode
}
