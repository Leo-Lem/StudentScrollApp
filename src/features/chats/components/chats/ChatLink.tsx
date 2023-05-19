import { Button, Stack, Typography } from "@mui/material"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import { Label } from "../../../../components"
import ProfileIcon from "../../../profiles/components/ProfileIcon"
import { readProfile } from "../../../profiles/redux"

export default function ChatLink({ studentId }: Props) {
  const dispatch = useAppDispatch()

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
