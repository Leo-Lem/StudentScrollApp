import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Button, Stack, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { readProfile } from "../../profiles/redux"
import ProfileIcon from "../../profiles/components/ProfileIcon"
import { Label } from "../../../components"

export default function ChatLink({ studentId }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const profile = useAppSelector((state) => state.profiles[studentId])

  useEffect(() => {
    if (profile === undefined) dispatch(readProfile(studentId))
  }, [studentId])

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" paddingY={1}>
      <Button color="inherit" href={`/profile/${studentId}`}>
        <ProfileIcon icon={profile.icon} sx={{ maxHeight: 50 }} />

        <Typography variant="h6" textTransform="capitalize" width="100%" paddingX={1}>
          {profile.name}
        </Typography>
      </Button>

      <Button color="inherit" href={`/chats/${studentId}`}>
        <Label type="chat" display="iconOnly" />
      </Button>
    </Stack>
  )
}

interface Props {
  studentId: number
}