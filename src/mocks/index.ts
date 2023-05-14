import { Model, belongsTo, createServer } from "miragejs"

import mockAuthentication, { exampleStudents } from "./auth"
import mockPosts, { examplePosts } from "./posts"
import mockProfiles, { exampleProfiles } from "./profiles"
import mockSettings, { exampleSettings } from "./settings"
import mockFollowing, { exampleFollows } from "./followers"

createServer({
  namespace: "api/v1",
  models: {
    post: Model,
    student: Model,
    profile: Model.extend({ student: belongsTo() }),
    settings: Model.extend({ student: belongsTo() }),
    follows: Model
  },
  routes() {
    mockAuthentication(this)
    mockPosts(this)
    mockProfiles(this)
    mockSettings(this)
    mockFollowing(this)
  },
  seeds(server) {
    server.db.loadData({
      posts: examplePosts,
      students: exampleStudents,
      profiles: exampleProfiles,
      settings: exampleSettings,
      follows: exampleFollows
    })
  }
})
