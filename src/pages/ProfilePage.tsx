import React, { type ReactElement } from "react"
import ProfileView from "../components/ProfileView"
import { Box } from "@mui/material"

export default function ProfilePage(): ReactElement {
  return (
    <Box maxWidth={400}>
      <ProfileView />
    </Box>
  )
}
