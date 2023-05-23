import { createAsyncThunk } from "@reduxjs/toolkit"


import { deleteLocation, saveLocation, setStatus } from ".."
import Result from "../../../../lib/Result"
import StudentLocation from "../../types/StudentLocation"


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

export default createAsyncThunk("nearby/getCurrentLocation", async (_, thunkAPI) => {
  const { geolocation } = navigator

  if (geolocation === undefined) thunkAPI.dispatch(setStatus("unavailable"))

  const location = await getLocation()

  if (location.ok) {
    thunkAPI.dispatch(setStatus(location.value))
    thunkAPI.dispatch(saveLocation(location.value))
  } else if (!location.ok && location.error) {
    thunkAPI.dispatch(setStatus("denied"))
    thunkAPI.dispatch(deleteLocation())
  } else {
    thunkAPI.dispatch(setStatus("unavailable"))
  }
})