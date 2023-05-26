import { Server } from "miragejs"

import authentication from "./authentication"
import posts from "./posts"
import profiles from "./profiles"
import settings from "./settings"
import chats from "./chats"
import messages from "./messages"

export default function routes(this: Server) {
  authentication(this)
  posts(this)
  profiles(this)
  settings(this)
  chats(this)
  messages(this)
  this.get("/maps", () => JSON.stringify({ apiKey: "API_KEY" })) // replace with the real api key for trying this out
}
