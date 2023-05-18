import { Server } from "miragejs"
import Message from "../../features/chats/types/Message"

export default function mockMessages(server: Server) {
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
