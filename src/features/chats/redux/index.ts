import chats from "./slice"

export default chats.reducer

export const { addChats, addMessages } = chats.actions
export { default as readMessages } from "./actions/readMessage"
export { default as sendMessage } from "./actions/sendMessage"
