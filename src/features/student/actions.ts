import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import State from "./state";

import { setAuthenticated } from "../authentication/redux";
import { addFollowers, addFollows, removeFollowers, removeFollows } from "../following/redux";
import { addProfile, removeProfile } from "../profiles/redux";

export default function extraReducers(builder: ActionReducerMapBuilder<State | null>) {
  builder
    .addCase(setAuthenticated, (student, action) => {
      if (student === null) student = { id: action.payload.studentId }
      else student.id = action.payload.studentId
    })
    .addCase(addFollows, (student, action) => {
      if (student === null || action.payload.id !== student.id) return
      if (student.follows === undefined) student.follows = []
      student.follows.push(...action.payload.follows)
    })
    .addCase(addFollowers, (student, action) => {
      if (student === null || action.payload.id !== student.id) return
      if (student.followers === undefined) student.followers = []
      student.followers.push(...action.payload.followers)
    })
    .addCase(removeFollows, (student, action) => {
      if (student === null || action.payload.id !== student.id) return
      if (student.follows === undefined) return
      student.follows = student.follows.filter(follow => !action.payload.follows.includes(follow))
    })
    .addCase(removeFollowers, (student, action) => {
      if (student === null || action.payload.id !== student.id) return
      if (student.followers === undefined) return
      student.followers = student.followers.filter(follower => !action.payload.followers.includes(follower))
    })
    .addCase(addProfile, (student, action) => {
      if (student === null || action.payload.studentId !== student.id) return
      student.profile = action.payload.profile
    })
    .addCase(removeProfile, (student, action) => {
      if (student === null || action.payload !== student.id) return
      delete student.profile
    })
}