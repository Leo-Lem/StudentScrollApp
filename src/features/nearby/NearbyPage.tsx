import { Button, Card, Grid } from "@mui/material"
import { useEffect } from "react"

import { Label } from "../../components"
import { useAppDispatch, useAppSelector, useIsCompact, useStudentId } from "../../lib/hooks"

import MapWithPermission from "./components/MapWithPermission"
import NearbyStudentsList from "./components/NearbyStudentsList"
import StudentMarker from "./components/StudentMarker"
import { setStatus } from "./redux"
import getLocation from "./redux/actions/getCurrentLocation"
import readNearbyStudents from "./redux/actions/readNearbyStudents"
import StudentLocation from "./types/StudentLocation"

export default function NearbyPage() {
  const dispatch = useAppDispatch()
  const isCompact = useIsCompact()
  const studentId = useStudentId()

  const status = useAppSelector((state) => state.nearby.status)
  const nearbyStudentsIds = useAppSelector((state) =>
    state.nearby.locations !== undefined
      ? Object.keys(state.nearby.locations).map(Number)
      : undefined
  )

  const location = status as StudentLocation

  useEffect(() => {
    if (status === undefined) dispatch(getLocation())
    else if (location !== undefined) dispatch(readNearbyStudents(location))
  }, [status])

  return (
    <Grid container direction={isCompact ? "column" : "row"} spacing={1}>
      <Grid item xs position="relative" sx={{ position: "relative" }}>
        <MapWithPermission center={location} isAllowed={status !== "denied"}>
          {nearbyStudentsIds?.map((nearbyStudentId) => (
            <StudentMarker
              key={nearbyStudentId}
              studentId={nearbyStudentId}
              isSelf={nearbyStudentId === studentId}
            />
          ))}
        </MapWithPermission>

        <Button
          color="inherit"
          variant="contained"
          onClick={() => {
            dispatch(setStatus(undefined))
            window.location.reload()
            dispatch(getLocation())
          }}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            aspectRatio: 1,
            marginTop: 2,
            marginRight: 1
          }}
        >
          <Label type="refresh" display="iconOnly" />
        </Button>
      </Grid>

      <Grid item xs={4}>
        <Card elevation={3}>
          <NearbyStudentsList
            nearbyStudentsIds={
              nearbyStudentsIds?.filter((nearbyStudentId) => nearbyStudentId !== studentId) ?? []
            }
            locationIsAllowed={status !== "denied"}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
