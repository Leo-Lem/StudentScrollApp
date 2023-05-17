import { Server } from "miragejs"
export const exampleMessages = [
  { timestamp: new Date("2023-05-12T11:30:00"), message: "Prototype1", profileId: 1, chatId: 1 },
  { timestamp: new Date("2023-05-12T11:50:00"), message: "Prototype2", profileId: 1, chatId: 1 },
  { timestamp: new Date("2023-05-12T11:40:00"), message: "Prototype3", profileId: 4, chatId: 1 },
  { timestamp: new Date("2023-05-12T11:20:00"), message: "Prototype4", profileId: 4, chatId: 1 }
]
export default function mockMessages(server: Server) {
  server.post("/messages", (schema: any, request) => {
    const message = JSON.parse(request.requestBody)
    schema.messages.create(message)
    console.log(schema.messages.where({ chatId: message.chatId }))
    console.log(schema.messages.all())
    return schema.messages.where({ chatId: message.chatId })
  })
}
