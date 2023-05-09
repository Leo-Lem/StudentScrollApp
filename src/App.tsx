import React, { type ReactElement } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container, CssBaseline, ThemeProvider } from "@mui/material"

import { dark } from "./themes"
import { store, useAppSelector } from "./redux"
import { Header, Footer, WelcomePage, DashboardPage, ProfilePage } from "./pages"

export default function App(): ReactElement {
  const isAuthenticated = useAppSelector((state) => state.authentication.status === "authenticated")

  return (
    <BrowserRouter>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <Container disableGutters sx={{ padding: 1 }}>
          {isAuthenticated ? <Header /> : <WelcomePage />}

          {isAuthenticated && (
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile/:studentId" element={<ProfilePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          )}

          <Footer />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
