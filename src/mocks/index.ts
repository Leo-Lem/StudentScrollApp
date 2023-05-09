import { Model, belongsTo, createServer } from "miragejs"

import mockAuthentication, { exampleStudents } from "./auth"
import mockPosts, { examplePosts } from "./posts"
import mockProfiles, { exampleProfiles } from "./profiles"

export function createMockedAPI() {
  return createServer({
    namespace: "api/v1",
    models: {
      post: Model,
      student: Model,
      profile: Model.extend({ student: belongsTo() })
    },
    routes() {
      mockAuthentication(this)
      mockPosts(this)
      mockProfiles(this)
    },
    seeds(server) {
      server.db.loadData({
        posts: examplePosts,
        students: exampleStudents,
        profiles: exampleProfiles
      })
    }
  })
}