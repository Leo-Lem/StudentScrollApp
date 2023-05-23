import { PayloadAction } from "@reduxjs/toolkit"

import State from "../state"
import LocationStatus from "../../types/LocationStatus"

export default function handleSetCurrentLocation(
  state: State,
  action: PayloadAction<LocationStatus | undefined>
) {
  state.status = action.payload
}
