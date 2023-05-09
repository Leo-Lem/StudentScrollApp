import { createAsyncThunk } from "@reduxjs/toolkit";

import tryGettingAuthorizationHeader from "../../authentication/derived/tryGettingAuthorizationHeader";
import tryGettingStudentId from "../../authentication/derived/tryGettingStudentId";
import { Profile } from "../types";

export default createAsyncThunk(
  "profile/readProfile",
  async (id: number | undefined, thunkAPI): Promise<{ id: number, profile: Profile }> => {
    const unwrappedId = id ?? tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${unwrappedId}/profile`, {
      method: "GET",
      headers: { Authorization: tryGettingAuthorizationHeader(thunkAPI) }
    })

    if (response.ok && unwrappedId !== undefined) return { id: unwrappedId, profile: (await response.json()) as Profile }
    else throw new Error("Failed to read posts: " + response.statusText)
  }
)