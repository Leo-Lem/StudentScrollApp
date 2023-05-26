import { PayloadAction } from "@reduxjs/toolkit"

import StudentLocation from "../../types/StudentLocation"
import State from "../state"

export default function handleSetLocation(
  state: State,
  action: PayloadAction<StudentLocation | undefined>
) {
  state.location = action.payload
}
