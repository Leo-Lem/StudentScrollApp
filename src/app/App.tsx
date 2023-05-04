import { type ReactElement } from "react"
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import { Container, CssBaseline, ThemeProvider } from "@mui/material"

import theme from "./theme"

import Header from "../components/Header"
import { WelcomePage, DashboardPage, ProfilePage } from "../pages"

import { useJwt } from "../hooks"

export default function App(): ReactElement {
  const [jwt] = useJwt()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters sx={{ padding: 1, height: "100vh" }}>
        <Router>
          {jwt !== null ? <Header /> : <WelcomePage />}

          {jwt !== null && (
            <Routes>
              <Route path="" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Routes >
          )}
        </Router >
      </Container >
    </ThemeProvider >
  )
}
