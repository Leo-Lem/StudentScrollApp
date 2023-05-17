import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../redux"

import { readMessages, startChat } from "../redux"
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

  return (
    <Button variant="contained" fullWidth onClick={handleStartChat}>
      {chatExists ? "Open Chat" : "Start Chat"}
    </Button>
  )
}

interface Props {
  studentId: number
}
