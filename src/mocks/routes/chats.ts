import { Server } from "miragejs"

export default function mock(server: Server) {
  server.get("chats/:chatId", (schema: any, { params: { chatId } }) =>
    respond(schema.chats.findBy({ id: chatId }))
  )

  server.get("chats", (schema: any) => {
    return schema.chats.all().models.map((chat: any) => respond(chat))
  })

  server.post("chats", (schema: any, { requestBody }) =>
    respond(
      schema.chats.create({ participantIds: JSON.parse(requestBody).map(String), messageIds: [] })
    )
  )
}

interface Response {
  id: number
  participantIds: number[]
  messageIds: number[]
}

function respond({ id, participantIds, messageIds }: any): Response {
  return {
    id: parseInt(id),
    participantIds: participantIds.map(Number),
    messageIds: messageIds.map(Number)
  }
}
