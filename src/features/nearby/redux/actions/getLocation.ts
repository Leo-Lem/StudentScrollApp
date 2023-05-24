import { createAsyncThunk } from "@reduxjs/toolkit"

import Result from "../../../../lib/Result"
import StudentLocation from "../../types/StudentLocation"
import { setStatus } from "../slice"
import saveLocation from "./saveLocation"
import deleteLocation from "./deleteLocation"

async function getLocation(): Promise<Result<StudentLocation, boolean>> {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          ok: true,
          value: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      },
      (e) => {
        resolve({ ok: false, error: e.code === 1 })
      }
    )
  })
}

export default createAsyncThunk("nearby/getLocation", async (_, thunkAPI) => {
  const { geolocation } = navigator

  if (geolocation === undefined) thunkAPI.dispatch(setStatus("unavailable"))

  const location = await getLocation()

  if (location.ok) {
    thunkAPI.dispatch(saveLocation(location.value))
    thunkAPI.dispatch(setStatus("permitted"))
  } else if (!location.ok && location.error) {
    thunkAPI.dispatch(deleteLocation())
    thunkAPI.dispatch(setStatus("denied"))
  } else {
    thunkAPI.dispatch(setStatus("unavailable"))
  }
})
