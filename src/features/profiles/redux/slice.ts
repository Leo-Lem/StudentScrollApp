import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./state"

import handleAddProfile from "./actions/handleAddProfile"
import handleRemoveProfile from "./actions/handleRemoveProfile"

const profiles = createSlice({
  name: "profiles",
  initialState: initialState,
  reducers: {
    addProfile: handleAddProfile,
    removeProfile: handleRemoveProfile
  }
})

export default profiles