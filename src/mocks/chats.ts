import { Server } from "miragejs"

export const exampleChats = [
  { between: "1and4", profileIds: [1, 4], messageIds: [1, 2, 3, 4] },
  { between: "3and4", profileIds: [3, 4] },
  { between: "4and5", profileIds: [4, 5] },
  { between: "4and6", profileIds: [4, 6] }
]

export default function mockChats(server: Server) {
  server.post("/chat", (schema: any, request) => {
    const chat = JSON.parse(request.requestBody)
    schema.chats.where({ between: chat.between }).models[0] !== undefined
    if (schema.chats.where({ between: chat.between }).models[0] !== undefined) {
      return ""
    } else {
      return schema.chats.create(chat)
    }
  })

  server.get("/chats", (schema: any) => {
    // This works for serializer but not the specifics for some unknown unsure reason
    // to figure out and fix essential
    return schema.chats.all()
  })

  server.get("/chat/:room", (schema: any, request: any) => {
    // Fix this the embed for serialize for mirageJS doesn't work no matter what i do even if i
    // complelely remake the mirageJS server || fixed error but the new way it works can be better
    // Nope now its the best evar
    if (schema.chats.where({ between: request.params.room }).models[0] !== undefined) {
      const chatSearch = schema.chats.findBy({ between: request.params.room })
      // console.log(chatSearch)
      return chatSearch
    } else {
      throw new Error("No chat found")
    }
  })

  // SSE code but doesn't work through mirageJS heres the code if I can figure it out later
  // server.get("/", (schema: any, request: any) => {
  //     console.log("hit")
  //     const idSearch = schema.chats.where({ between: request.params.room }).models[0].attrs.id
  //     return schema.messages.where({chatId: idSearch}).models.map((model: any) => model.attrs);
  // })

  server.get("/chats/:id", (schema: any, request: any) => {
    const relatedChats = schema.chats
      .all()
      .filter((chat: any) => chat.profileIds.includes(request.params.id))
    // old and worse solution but it works
    // const lower = schema.chats.where({student1: request.params.id}).models.map((model: any) => model.attrs)
    // const higher = schema.chats.where({student2: request.params.id}).models.map((model: any) => model.attrs)
    // const total = lower.concat(higher)
    return relatedChats
  })
}
