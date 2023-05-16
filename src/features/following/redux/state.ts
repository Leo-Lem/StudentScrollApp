export interface State {
  [studentId: number]: {
    follows?: number[]
    followers?: number[]
  }
}

export const initialState = {} as State
