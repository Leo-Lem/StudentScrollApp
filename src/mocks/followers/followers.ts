import { Response, Server } from "miragejs"

import Follower from "./follower"

export default function mockFollowers(server: Server) {
  server.get("students/:studentId/followers", (schema, request) => {
    const studentId = request.params.studentId
    return schema.db.follows.where({ studentId }).map((f: Follower) => f.followerId)
  })

  server.get("students/:studentId/follows", (schema, request) => {
    const studentId = request.params.studentId
    return schema.db.follows.where({ followerId: studentId }).map((f: Follower) => f.studentId)
  })

  server.post("students/:studentId/followers/:followerId", (schema, { url }) => {
    const studentId = parseInt(url.split("/")[4])
    const followerId = parseInt(url.split("/")[6])
    schema.db.follows.insert({ studentId, followerId })
    return schema.db.follows.where({ studentId }).map((f: Follower) => f.followerId)
  })

  server.delete("students/:studentId/followers/:followerId", (schema, { url }) => {
    const studentId = parseInt(url.split("/")[4])
    const followerId = parseInt(url.split("/")[6])
    schema.db.follows.remove({ studentId, followerId })
    return new Response(204)
  })
}
