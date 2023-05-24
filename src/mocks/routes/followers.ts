import { Response, Server } from "miragejs"

export default function mock(server: Server) {
  server.post("students/:studentId/followers", (schema) => {
    return new Response(201)
  })

  server.delete("students/:studentId/followers", (schema, { url }) => {
    return new Response(204)
  })
}
