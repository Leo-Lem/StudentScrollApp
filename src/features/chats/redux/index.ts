import chats from "./slice"

export default chats.reducer

export { default as useChats } from "./hooks/useChats"
export { default as useChat } from "./hooks/useChat"
export { default as useMessage } from "./hooks/useMessage"
export { default as useCreateChat } from "./hooks/useCreateChat"
export { default as useSendMessage } from "./hooks/useSendMessage"
export { default as useChatIdWithStudent } from "./hooks/useChatIdWithStudent"
