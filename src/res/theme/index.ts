import themes from "./themes.json"

export type Theme = typeof themes[number]
export { themes }
export { default as ThemeIcon } from "./ThemeIcon"

export { default as AppThemeProvider } from "./AppThemeProvider"