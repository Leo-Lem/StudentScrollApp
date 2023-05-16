import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import State from "../state";

import { setAuthenticated } from "../../authentication/redux";
import { addFollowers, addFollows, removeFollowers, removeFollows } from "../../following/redux";
import { addProfile, removeProfile } from "../../profiles/redux";

export default function extraReducers(builder: ActionReducerMapBuilder<State>) {
  builder
    .addCase(setAuthenticated, (student, action) => {
      if (student.id === undefined) student.id = action.payload.studentId
      else student.id = action.payload.studentId
    })
    .addCase(addFollows, (student, action) => {
      if (student.id !== action.payload.studentId) return
      if (student.follows === undefined) student.follows = []
      const follows = action.payload.follows.filter(follow => !student.follows?.includes(follow))
      student.follows?.push(...follows)
    })
    .addCase(addFollowers, (student, action) => {
      if (student.id === undefined || student.id !== action.payload.studentId) return
      if (student.followers === undefined) student.followers = []
      const followers = action.payload.followers.filter(follower => !student.followers?.includes(follower))
      student.followers?.push(...followers)
    })
    .addCase(removeFollows, (student, action) => {
      if (student.id === undefined || student.follows === undefined || student.id !== action.payload.studentId) return
      student.follows = student.follows.filter(follow => !action.payload.follows.includes(follow))
    })
    .addCase(removeFollowers, (student, action) => {
      if (student.id === undefined || student.followers === undefined || student.id !== action.payload.id) return
      student.followers = student.followers.filter(follower => !action.payload.followers.includes(follower))
    })
    .addCase(addProfile, (student, action) => {
      if (student.id === undefined || student.id !== action.payload.studentId) return
      student.profile = action.payload.profile
    })
    .addCase(removeProfile, (student, action) => {
      if (student.id === undefined || student.id !== action.payload) return
      delete student.profile
    })
}