import { ComponentType } from "react"
import * as Icon from "@mui/icons-material"

import { LabelType } from "."

export default {
  posts: Icon.DynamicFeed,
  chats: Icon.Chat,
  profile: Icon.AccountBox,
  settings: Icon.Settings,
  signout: Icon.Logout,
  signin: Icon.Login,
  signup: Icon.ExitToApp,
  post: Icon.Send,
  save: Icon.Save,
  edit: Icon.Edit,
  about: Icon.Info,
  search: Icon.Search,
  follow: Icon.PersonAdd,
  unfollow: Icon.PersonRemove,
  chat: Icon.Chat,
  send: Icon.Send
} as { [key in LabelType]: ComponentType<any> }
