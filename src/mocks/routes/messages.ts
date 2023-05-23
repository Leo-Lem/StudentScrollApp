import { Server } from "miragejs"

export default function mock(server: Server) {
  server.get(
    "chats/:chatId/messages/:messageId",
    (schema: any, { params: { chatId, messageId } }) => {
      return respond(schema.db.messages.find(messageId))
    }
  )

  server.post("chats/:chatId/messages", (schema, { requestBody: content }) => {
    return respond(
      schema.db.messages.insert({
        content: content,
        senderId: 1,
        timestamp: new Date()
      })
    )
  })
}

interface Response {
  id: number
  content: string
  senderId: number
  timestamp: Date
}

function respond(message: any): Response {
  return {
    id: parseInt(message.id),
    content: message.content,
    senderId: parseInt(message.senderId),
    timestamp: new Date(message.timestamp)
  }
}
