import { Button, Stack, Typography } from "@mui/material"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector, useStudentId } from "../../../../lib/hooks"

import { Label } from "../../../../components"
import ProfileIcon from "../../../profiles/components/ProfileIcon"
import { readProfile } from "../../../profiles/redux"
import Chat from "../../types/Chat"

export default function ChatRow({ chat, isOpen }: Props) {
  const dispatch = useAppDispatch()
  const studentId = useStudentId()

  const participantId = chat.participantIds.find((id) => id !== studentId)

  if (participantId === undefined) throw new Error("No participant in chat")

  const profile = useAppSelector((state) => state.profiles[participantId])

  useEffect(() => {
    if (profile === undefined) dispatch(readProfile(participantId))
  }, [participantId])

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" paddingY={1}>
      <Button color="inherit" href={`/profile/${participantId}`}>
        <ProfileIcon icon={profile?.icon} sx={{ maxHeight: 50 }} />

        <Typography variant="h6" textTransform="capitalize" width="100%" paddingX={1}>
          {profile?.name}
        </Typography>
      </Button>

      <Button
        href={isOpen ? "/chats" : `/chats/${chat.id}`}
        variant={isOpen ? "contained" : "text"}
        color={isOpen ? "success" : "inherit"}
        sx={{ borderRadius: 100 }}
      >
        <Label type="chat" display="iconOnly" />
      </Button>
    </Stack>
  )
}

interface Props {
  chat: Chat
  isOpen: boolean
}
