import { PayloadAction } from "@reduxjs/toolkit"
import State from "../state"
import StudentLocation from "../../types/Location"

export default function handleAddLocation(
  state: State,
  action: PayloadAction<{ studentId: number; location: StudentLocation }>
) {
  state[action.payload.studentId] = action.payload.location
}
