import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

import { addProfile } from "../../../profiles/redux/slice"
import State from "../state"

export default function extraReducers(builder: ActionReducerMapBuilder<State>) {
  builder
    .addCase(addProfile, (state, action) => {
      if (state[action.payload.studentId.toString()] === undefined)
        state[action.payload.studentId.toString()] = []

      state[action.payload.studentId.toString()].push({ id: "profileById", value: action.payload })
    })
}
