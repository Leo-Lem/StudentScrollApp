import chats from "./slice"

export default chats.reducer
export const { addMessages, startChat } = chats.actions
export { default as readMessages } from "./actions/readMessages"
export { default as sendMessage } from "./actions/sendMessage"
