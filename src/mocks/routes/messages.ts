import { Server } from "miragejs"

export default function mockMessages(server: Server) {
  server.get("chats", (schema: any, { queryParams }) => {
    return schema.messages.all().models
  })

  server.post("chats", (schema, { requestBody }) => {
    const { content, senderId }: { content: string; senderId: number } = JSON.parse(requestBody)

    return schema.db.messages.insert({
      content: content,
      senderId: senderId,
      timestamp: new Date()
    })
  })
}
