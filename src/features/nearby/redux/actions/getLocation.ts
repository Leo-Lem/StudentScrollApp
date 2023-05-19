import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../lib/redux"

import { addLocation, deleteLocation, saveLocation, setAllowed } from ".."
import StudentLocation from "../../types/StudentLocation"

export default createAsyncThunk("nearby/getLocation", async (_, thunkAPI) => {
  const studentId = tryGettingStudentId(thunkAPI)

  const { geolocation } = navigator

  if (geolocation === undefined) thunkAPI.dispatch(setAllowed(false))

  geolocation.watchPosition(
    (position) => {
      const location: StudentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      thunkAPI.dispatch(setAllowed(true))
      thunkAPI.dispatch(addLocation({ studentId, location }))
      thunkAPI.dispatch(saveLocation(location))
    },
    () => {
      thunkAPI.dispatch(setAllowed(false))
      thunkAPI.dispatch(deleteLocation())
    }
  )
})
