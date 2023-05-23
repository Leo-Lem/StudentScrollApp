import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../lib/redux"
import API from "../../../../lib/API"

export default createAsyncThunk("nearby/saveLocation", async (thunkAPI) => {
  const result = await API.put(thunkAPI, "students", {
    newLocation: null
  })

  if (!result.ok) console.error(result.error)
})
