import { type ReactElement } from "react"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import { CssBaseline, ThemeProvider } from "@mui/material"

import theme from "./theme"
import Header from "../components/Header"
import WelcomePage from "../pages/WelcomePage"
import DashboardPage from "../pages/DashboardPage"
import useJwt from "../hooks/useJwt"

// TODO: persist user id in local storage
// TODO: persist jwt in local storage

export default function App(): ReactElement {
  const [jwt] = useJwt()

  const search = (query: string): void => {
    console.log(query)
    // TODO: handle search
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {jwt !== null ? <Header search={search} /> : <WelcomePage />}

        {jwt !== null && (
          <Routes>
            <Route path="" element={<DashboardPage />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  )
}
