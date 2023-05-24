import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

import State from "../state"

import { setAuthenticated } from "../../authentication/redux"
import { addProfile, removeProfile } from "../../profiles/redux/slice"

export default function extraReducers(builder: ActionReducerMapBuilder<State>) {
  builder
    .addCase(setAuthenticated, (student, action) => {
      if (student.id === undefined) student.id = action.payload.studentId
      else student.id = action.payload.studentId
    })
    .addCase(addProfile, (student, action) => {
      if (student.id === undefined || student.id !== action.payload.studentId) return
      student.profile = action.payload
    })
    .addCase(removeProfile, (student, action) => {
      if (student.id === undefined || student.id !== action.payload) return
      delete student.profile
    })
}
