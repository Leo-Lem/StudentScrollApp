import { useNavigate } from "react-router"

import { useAppDispatch } from "../../../redux"

import { startChat } from "../redux"
import { Button } from "@mui/material"

export default function StartChatButton({ studentId }: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleStartChat = () => {
    dispatch(startChat(studentId))
    navigate(`/chats/${studentId}`)
  }

  return <Button variant="contained" fullWidth onClick={handleStartChat}>Start chat</Button>
}

interface Props {
  studentId: number
}