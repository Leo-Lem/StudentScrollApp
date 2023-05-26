import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./state"
import handleSetStatus from "./reducers/handleSetStatus"
import handleSetLocation from "./reducers/handleSetLocation"
import handleSetAPIKey from "./reducers/handleSetAPIKey"

const nearby = createSlice({
  name: "nearby",
  initialState,
  reducers: {
    setAPIKey: handleSetAPIKey,
    setStatus: handleSetStatus,
    setLocation: handleSetLocation
  }
})

export default nearby
export const { setAPIKey, setStatus, setLocation } = nearby.actions
