import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

import State from "../state"

import { addProfile, removeProfile } from "../../profiles/redux/slice"
import { setAuthenticated } from "../../authentication/redux/slice"

export default function extraReducers(builder: ActionReducerMapBuilder<State>) {
  builder
    .addCase(setAuthenticated, (student, action) => {
      student.id = action.payload.studentId
      sessionStorage.setItem("studentId", action.payload.studentId.toString())
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
