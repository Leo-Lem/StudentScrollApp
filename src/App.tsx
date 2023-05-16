import { useEffect, type ReactElement, Fragment } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container, CssBaseline } from "@mui/material"

import { useAppDispatch, useAppSelector } from "./redux"
import { AppThemeProvider } from "./res/theme"
import { AppLocaleProvider } from "./res/locale"

import { Header, Footer, WelcomeHeader, addPageChip } from "./features/navigation"
import { DashboardPage } from "./features/posts"
import { ProfilePage } from "./features/profiles"
import { WelcomePage } from "./features/authentication"
import { SettingsPage } from "./features/settings"

export default function App(): ReactElement {
  const isAuthenticated = useAppSelector((state) => state.authentication.status === "authenticated")

  // const dispatch = useAppDispatch()

  const authenticated = (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={addPageChip("posts", <DashboardPage />)} />
        <Route path="/profile/:studentId" element={addPageChip("profile", <ProfilePage />)} />
        <Route path="/settings" element={addPageChip("settings", <SettingsPage />)} />
        <Route path="/chats" element={addPageChip("chats", <h1>Chats</h1>)} />
      </Routes>
    </Fragment>
  )

  const notAuthenticated = (
    <Fragment>
      <WelcomeHeader />
      <WelcomePage />
    </Fragment>
  )

  return (
    <BrowserRouter>
      <AppThemeProvider>
        <AppLocaleProvider>
          <CssBaseline />
          <Container disableGutters>
            {isAuthenticated ? authenticated : notAuthenticated}
            <Footer />
          </Container>
        </AppLocaleProvider>
      </AppThemeProvider>
    </BrowserRouter>
  )
}
