import { Response, Server } from "miragejs"

interface Follower {
  studentId: number
  followerId: number
}

export default function mock(server: Server) {
  server.get("students/:studentId/followers", (schema, { params: { studentId } }) => {
    return schema.db.profiles
      .findBy({ studentId })
      .followers.map((id: string) => schema.db.profiles.findBy({ studentId: id }))
  })

  server.get("students/:studentId/follows", (schema, { params: { studentId } }) => {
    return schema.db.profiles
      .findBy({ studentId })
      .follows.map((id: string) => schema.db.profiles.findBy({ studentId: id }))
  })

  server.post("students/:studentId/followers", (schema) => {
    return new Response(201)
  })

  server.delete("students/:studentId/followers", (schema, { url }) => {
    return new Response(204)
  })
}
