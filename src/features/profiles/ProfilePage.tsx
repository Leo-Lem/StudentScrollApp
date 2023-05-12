import { type ReactElement } from "react"
import ProfileView from "./components/ProfileDetails"
import { Box, Stack } from "@mui/material"
import { Navigate, useParams } from "react-router-dom"
import useIsCompact from "../../hooks/useIsCompact"

export default function ProfilePage(): ReactElement {
  const { studentId } = useParams()
  if (studentId === undefined || isNaN(parseInt(studentId))) return <Navigate to="/" />

  const isCompact = useIsCompact()

  const id = parseInt(studentId)

  if (isCompact) return <ProfileView studentId={id} />
  else
    return (
      <Stack direction="column">
        <Box width="30vw" alignSelf="end">
          <ProfileView studentId={id} />
        </Box>
      </Stack>
    )
}
