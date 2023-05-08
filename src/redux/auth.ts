import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  token: string | null
  studentId: number | null
}

const initialState: AuthState = {
  token: null,
  studentId: null
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setStudentId: (state: AuthState, action: PayloadAction<number>) => {
      state.studentId = action.payload
    }
  }
})

export const { setToken, setStudentId } = auth.actions

export default auth.reducer