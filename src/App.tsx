import React, { type ReactElement } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container, CssBaseline, ThemeProvider } from "@mui/material"

import { dark } from "./themes"
import { useAppSelector } from "./redux"

import DashboardPage from "./features/posts/DashboardPage"
import ProfilePage from "./features/profiles/ProfilePage"
import Header from "./features/navigation/Header"
import WelcomePage from "./features/authentication/WelcomePage"
import Footer from "./features/navigation/Footer"
import WelcomeHeader from "./features/navigation/WelcomeHeader"

export default function App(): ReactElement {
  const isAuthenticated = useAppSelector((state) => state.authentication.status === "authenticated")

  return (
    <BrowserRouter>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <Container disableGutters sx={{ padding: 1 }}>
          {isAuthenticated ? <Header /> : <WelcomeHeader />}

          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile/:studentId" element={<ProfilePage />} />
            </Routes>
          ) : (
            <WelcomePage />
          )}

          <Footer />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
