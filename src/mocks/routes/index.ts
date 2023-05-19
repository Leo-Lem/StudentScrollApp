import { Server } from "miragejs"

import authentication from "./authentication"
import posts from "./posts"
import profiles from "./profiles"
import settings from "./settings"
import followers from "./followers"
import chats from "./chats"
import messages from "./messages"

export default function routes(this: Server) {
  authentication(this)
  posts(this)
  profiles(this)
  settings(this)
  followers(this)
  chats(this)
  messages(this)
}
