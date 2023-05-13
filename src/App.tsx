import { type ReactElement } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container, CssBaseline, ThemeProvider } from "@mui/material"

import { useAppSelector } from "./redux"

import { dark } from "./themes"

import { Header, Footer, WelcomeHeader } from "./features/navigation"
import { DashboardPage } from "./features/posts"
import { ProfilePage } from "./features/profiles"
import { WelcomePage } from "./features/authentication"
import { SettingsPage } from "./features/settings"
import addPageChip from "./features/navigation/PageChip"

// TODO: fix up the smallest regular layout

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
              <Route path="/" element={addPageChip("Posts", <DashboardPage />)} />
              <Route path="/profile/:studentId" element={addPageChip("Profile", <ProfilePage />)} />
              <Route path="/settings" element={addPageChip("Settings", <SettingsPage />)} />
              <Route path="/chats" element={addPageChip("Chats", <h1>Chats</h1>)} />
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
