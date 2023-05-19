import chats from "./slice"

export default chats.reducer

export const { addChats, addMessages } = chats.actions
export { default as readAllChats } from "./actions/readAllChats"
export { default as readChat } from "./actions/readChat"
export { default as createChat } from "./actions/createChat"
export { default as readMessages } from "./actions/readMessage"
export { default as sendMessage } from "./actions/sendMessage"
