import { Server } from "miragejs";

interface Follow {
  studentId: number
  followerId: number
}

export const exampleFollows: Follow[] = [
  { studentId: 1, followerId: 2 },
  { studentId: 1, followerId: 3 },
  { studentId: 1, followerId: 3 },
  { studentId: 1, followerId: 3 },
  { studentId: 1, followerId: 3 },
  { studentId: 1, followerId: 3 },
  { studentId: 1, followerId: 3 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 1 },
  { studentId: 2, followerId: 3 }
]

export default function mockFollowing(server: Server) {
  server.get("students/:studentId/followers", (schema, request) => {
    const studentId = request.params.studentId
    return schema.db.follows.where({ studentId }).map((f: Follow) => f.followerId)
  })

  server.get("students/:studentId/follows", (schema, request) => {
    const studentId = request.params.studentId
    return schema.db.follows.where({ followerId: studentId }).map((f: Follow) => f.studentId)
  })

  server.post("students/:studentId/followers/:followerId", (schema, { url }) => {
    const studentId = parseInt(url.split("/")[4])
    const followerId = parseInt(url.split("/")[6])
    schema.db.follows.insert({ studentId, followerId })
    return schema.db.follows.where({ studentId }).map((f: Follow) => f.followerId)
  })

  server.delete("students/:studentId/followers/:followerId", (schema, { url }) => {
    const studentId = parseInt(url.split("/")[4])
    const followerId = parseInt(url.split("/")[6])
    console.log(studentId, followerId)
    schema.db.follows.remove({ studentId, followerId })
    return schema.db.follows.where({ studentId }).map((f: Follow) => f.followerId)
  })
}