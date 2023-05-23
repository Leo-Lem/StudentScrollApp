import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import StudentLocation from "../../types/StudentLocation"

export default function handleAddLocation(
  state: State,
  action: PayloadAction<{ studentId: number; location: StudentLocation }>
) {
  if (state.locations === undefined) state.locations = {}

  if (!isNaN(action.payload.studentId))
    state.locations[action.payload.studentId] = action.payload.location
}
