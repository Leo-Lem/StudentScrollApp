import Chat from "../../types/Chat"
import useChats from "./useChats"

export default function useChatIdWithStudent(studentId: number): number | undefined {
  const chats = useChats()

  return chats?.find((chat: Chat) => chat.participantIds.includes(studentId))?.id
}
