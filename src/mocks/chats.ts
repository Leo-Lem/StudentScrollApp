import { Server } from "miragejs"
import Message from "../features/chats/types/Message"

export const exampleMessages = [
  {
    id: "1",
    content: "Hello there, mate!",
    senderId: 1,
    receiverId: 2,
    timestamp: new Date("2023-05-12T11:30:00")
  },
  {
    id: "2",
    content: "Hey, how are you?",
    senderId: 2,
    receiverId: 1,
    timestamp: new Date("2023-05-12T11:31:00")
  },
  {
    id: "3",
    content: "I'm fine, thanks!",
    senderId: 1,
    receiverId: 2,
    timestamp: new Date("2023-05-12T11:32:00")
  },
  {
    id: "4",
    content: "What about you?",
    senderId: 1,
    receiverId: 2,
    timestamp: new Date("2023-05-12T11:33:00")
  },
  {
    id: "5",
    content: "I'm fine too, thanks!",
    senderId: 2,
    receiverId: 1,
    timestamp: new Date("2023-05-12T11:34:00")
  },
  {
    id: "6",
    content: "How is your day going?",
    senderId: 2,
    receiverId: 1,
    timestamp: new Date("2023-05-12T11:35:00")
  },
  {
    id: "7",
    content: "It's going great!",
    senderId: 1,
    receiverId: 2,
    timestamp: new Date("2023-05-12T11:36:00")
  },
  {
    id: "8",
    content: "What about yours?",
    senderId: 1,
    receiverId: 2,
    timestamp: new Date("2023-05-12T11:37:00")
  },
  {
    id: "9",
    content: "It's going great too!",
    senderId: 2,
    receiverId: 1,
    timestamp: new Date("2023-05-12T11:38:00")
  }
]

export default function mockChats(server: Server) {
  server.get("chats", (schema, { queryParams }) => {
    const senderId = parseInt(queryParams.senderId)
    const receiverId = parseInt(queryParams.receiverId)

    return schema.db.messages.where(
      (message: Message) => message.senderId === senderId && message.receiverId === receiverId
    )
  })

  server.post("chats", (schema, { requestBody }) => {
    const {
      content,
      senderId,
      receiverId
    }: { content: string; senderId: number; receiverId: number } = JSON.parse(requestBody)

    return schema.db.messages.insert({
      content: content,
      senderId: senderId,
      receiverId: receiverId,
      timestamp: new Date()
    })
  })
}
