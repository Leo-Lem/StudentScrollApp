import { useNavigate } from "react-router"

import { useAppDispatch, useAppSelector } from "../../../redux"

import { readMessages, startChat } from "../redux"
import { Button } from "@mui/material"
import { useEffect } from "react"

export default function StartChatButton({ studentId }: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const chatExists = useAppSelector((state) => state.chats[studentId] !== undefined)

  useEffect(() => {
    if (!chatExists) dispatch(readMessages(studentId))
  }, [])

  const handleStartChat = () => {
    dispatch(startChat(studentId))
    navigate(`/chats/${studentId}`)
  }

  // TODO: add icon to button
  return (
    <Button variant="contained" fullWidth onClick={handleStartChat}>
      {chatExists ? "Open Chat" : "Start Chat"}
    </Button>
  )
}

interface Props {
  studentId: number
}
