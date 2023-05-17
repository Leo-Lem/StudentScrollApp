import Message from "../types/Message"

export default interface State {
  [studentId: number]: Message[]
}

export const initialState = {} as State
