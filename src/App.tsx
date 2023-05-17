import { Fragment, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Container, CssBaseline } from "@mui/material"

import { useAppDispatch, useAppSelector } from "./redux"
import { AppThemeProvider } from "./res/theme"
import { AppLocaleProvider } from "./res/locale"

import { Header, Footer, WelcomeHeader, addPageChip } from "./features/navigation"
import { DashboardPage } from "./features/posts"
import { ProfilePage } from "./features/profiles"
import { WelcomePage } from "./features/authentication"
import { SettingsPage } from "./features/settings"
import { ChatPage } from "./features/chats"
import { loadStudent } from "./features/student"
import { NearbyPage } from "./features/nearby"

export default function App() {
  const isAuthenticated = useAppSelector((state) => state.authentication.status === "authenticated")

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadStudent())
  }, [isAuthenticated])

  const authenticated = (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={addPageChip("posts", <DashboardPage />)} />
        <Route path="/settings" element={addPageChip("settings", <SettingsPage />)} />
        <Route path="/nearby" element={addPageChip("nearby", <NearbyPage />)} />
        <Route path="/profile/:studentId?" element={addPageChip("profile", <ProfilePage />)} />
        <Route path="/chats/:studentId?" element={addPageChip("chats", <ChatPage />)} />

        <Route path="*" element={<Navigate to="/" replace />} />
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
