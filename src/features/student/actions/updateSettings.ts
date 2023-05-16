import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingAuthorizationHeader, tryGettingStudentId } from "../../../redux"
import { setSettings } from "..";
import { Settings } from "../../settings";

export default createAsyncThunk(
  "student/updateSettings",
  async (info: { newTheme?: string; newLocale?: string; newIsLocated?: boolean }, thunkAPI) => {
    const id = tryGettingStudentId(thunkAPI)

    const response = await fetch(`/api/v1/students/${id}/settings`, {
      method: "PUT",
      headers: {
        Authorization: tryGettingAuthorizationHeader(thunkAPI),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })

    if (response.ok) thunkAPI.dispatch(setSettings((await response.json()) as Settings))
    else throw new Error("Failed to update settings: " + response.statusText)
  }
)
