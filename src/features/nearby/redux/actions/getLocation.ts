import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../../redux"
import { addLocation, deleteLocation, saveLocation, setAllowed } from ".."
import StudentLocation from "../../types/Location"

export default createAsyncThunk("nearby/getLocation", async (_, thunkAPI) => {
  const studentId = tryGettingStudentId(thunkAPI)

  const { geolocation } = navigator

  if (geolocation === undefined) return

  geolocation.getCurrentPosition(
    (position) => {
      const location: StudentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
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
