import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

import { addProfile } from "../../../profiles/redux"

import State from "../state"

export default function extraReducers(builder: ActionReducerMapBuilder<State>) {
  builder.addCase(addProfile, (state, action) => {
    if (action.payload.profile.location !== undefined)
      state[action.payload.studentId] = action.payload.profile.location
  })
}
