import React, { type ReactElement } from "react"
import ProfileView from "../components/ProfileView"
import { Box, Stack } from "@mui/material"

export default function ProfilePage(): ReactElement {
  return (
    <Stack direction="column">
      <Box width={400} alignSelf="end">
        <ProfileView />
      </Box>
    </Stack>
  )
}
