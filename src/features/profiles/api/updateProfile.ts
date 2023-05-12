import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../redux"
import { Profile } from "../types"

export default createAsyncThunk(
  "profile/updateProfile",
  async (
    info: { newName?: string; newBio?: string; newIcon?: string },
    thunkAPI
  ): Promise<{ id: number; profile: Profile }> => {
    const id = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${id}/profile`, {
      method: "PUT",
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })

    if (response.ok && id !== undefined) return { id, profile: (await response.json()) as Profile }
    else throw new Error("Failed to read posts: " + response.statusText)
  }
)
