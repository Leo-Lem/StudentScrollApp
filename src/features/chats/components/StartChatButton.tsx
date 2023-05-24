import { useNavigate } from "react-router-dom"

import { AsyncButton, Label } from "../../../components"
import { useChatIdWithStudent, useCreateChat } from "../redux"

export default function StartChatButton({ studentId }: Props) {
  const navigate = useNavigate()

  const chatId = useChatIdWithStudent(studentId)
  const createChat = useCreateChat()

  const openChat = async (): Promise<boolean> => {
    let id = chatId

    if (id === undefined) id = await createChat(studentId)

    navigate(`/chats/${id}`)
    return true
  }

  return (
    <AsyncButton action={openChat} variant="contained" fullWidth>
      <Label type="chat" />
    </AsyncButton>
  )
}

interface Props {
  studentId: number
}
