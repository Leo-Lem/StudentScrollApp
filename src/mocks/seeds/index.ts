import { Server } from "miragejs"

import students from "./students.json"
import posts from "./posts.json"
import profiles from "./profiles.json"
import settings from "./settings.json"
import chats from "./chats.json"
import messages from "./messages.json"

export default function seeds(server: Server) {
  server.db.loadData({
    students: students,
    posts: posts,
    profiles: profiles,
    settings: settings,
    chats: chats,
    messages: messages
  })
}
