import Chat from "../types/Chat"
import Message from "../types/Message"

export default interface State {
  chats?: Chat[]
  messages: Message[]
}

export const initialState: State = { chats: undefined, messages: [] }
