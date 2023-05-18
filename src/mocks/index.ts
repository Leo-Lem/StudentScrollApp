import { Model, belongsTo, createServer } from "miragejs"

import { mockAuthentication, mockSettings, exampleStudents, exampleSettings } from "./students"
import { mockProfiles, exampleProfiles } from "./profiles"
import { examplePosts, mockPosts } from "./posts"
import { exampleFollowers, mockFollowers } from "./followers"
import { exampleMessages, mockMessages } from "./chats"

createServer({
  namespace: "api/v1",
  models: {
    post: Model,
    student: Model,
    profile: Model.extend({ student: belongsTo() }),
    settings: Model.extend({ student: belongsTo() }),
    follows: Model,
    message: Model
  },
  routes() {
    mockAuthentication(this)
    mockPosts(this)
    mockProfiles(this)
    mockSettings(this)
    mockFollowers(this)
    mockMessages(this)
  },
  seeds(server) {
    server.db.loadData({
      students: exampleStudents,
      posts: examplePosts,
      profiles: exampleProfiles,
      settings: exampleSettings,
      follows: exampleFollowers,
      messages: exampleMessages
    })
  }
})
