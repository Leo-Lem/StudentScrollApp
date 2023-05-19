import { Server } from "miragejs"

export default function mockChats(server: Server) {
  server.get("chats", (schema: any, { queryParams }) => {
    return schema.messages.all().models
  })

  server.post("chats", (schema: any, { requestBody }) => {
    const participantIds: number[] = JSON.parse(requestBody)

    return schema.chats.create({
      participants: participantIds.map((id) => schema.students.find(id))
    })
  })
}
