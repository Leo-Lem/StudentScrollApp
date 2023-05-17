import { ThemeProvider } from "@emotion/react"
import { useMediaQuery } from "@mui/material"
import { ReactNode } from "react"

import { useAppSelector } from "../../redux"

import colorful from "./themes/colorful"
import dark from "./themes/dark"
import light from "./themes/light"

export default function AppThemeProvider({ children }: Props) {
  const theme = useAppSelector((state) => state.student?.settings?.theme)
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
