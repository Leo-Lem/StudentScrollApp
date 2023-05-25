import { Container, CssBaseline } from "@mui/material"
import { Fragment } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppLocaleProvider } from "./res/locale"
import { AppThemeProvider } from "./res/theme"

import { WelcomePage } from "./features/authentication"
import { useIsAuthenticated } from "./features/authentication/redux"
import { ChatsPage } from "./features/chats"
import { Footer, Header, WelcomeHeader, addPageChip } from "./features/navigation"
import { NearbyPage } from "./features/nearby"
import { DashboardPage } from "./features/posts"
import { ProfilePage } from "./features/profiles"
import { SettingsPage } from "./features/settings"

export default function App() {
  const isAuthenticated = useIsAuthenticated()

  const authenticated = (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={addPageChip("posts", <DashboardPage />)} />
        <Route path="/posts/:postId?" element={addPageChip("posts", <DashboardPage />)} />
        <Route path="/settings" element={addPageChip("settings", <SettingsPage />)} />
        <Route path="/nearby" element={addPageChip("nearby", <NearbyPage />)} />
        <Route path="/profile/:studentId?" element={addPageChip("profile", <ProfilePage />)} />
        <Route path="/chats/:chatId?" element={addPageChip("chats", <ChatsPage />)} />

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
