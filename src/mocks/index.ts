import { Model, belongsTo, createServer, hasMany, RestSerializer } from "miragejs"
import mockAuthentication, { exampleStudents } from "./auth"
import mockPosts, { examplePosts } from "./posts"
import mockProfiles, { exampleProfiles } from "./profiles"
import mockSettings, { exampleSettings } from "./settings"
import mockFollowing, { exampleFollows } from "./followers"
import mockMessages, { exampleMessages } from "./messages"
import mockChats, { exampleChats } from "./chats"

createServer({
  namespace: "api/v1",
  models: {
    post: Model,
    student: Model,
    profile: Model.extend({ student: belongsTo() }),
    settings: Model.extend({ student: belongsTo() }),
    follows: Model,
    chat: Model.extend({ messages: hasMany(), profile: hasMany() })
  },
  routes() {
    mockAuthentication(this)
    mockPosts(this)
    mockProfiles(this)
    mockSettings(this)
    mockFollowing(this)
    mockMessages(this)
    mockChats(this)
  },
  serializers: {
    chat: RestSerializer.extend({
      include: ["messages", "profile"],
      embed: true
    }),
    message: RestSerializer.extend({
      include: ["profile", "chat"],
      embed: true
    })
  },
  seeds(server) {
    server.db.loadData({
      posts: examplePosts,
      students: exampleStudents,
      profiles: exampleProfiles,
      settings: exampleSettings,
      follows: exampleFollows,
      messages: exampleMessages,
      chats: exampleChats
    })
  }
})
