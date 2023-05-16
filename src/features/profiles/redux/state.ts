import Profile from "../types/Profile"

export default interface State {
  [id: number]: Profile
}

export const initialState = {} as State
