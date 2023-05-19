import { Card, Grid } from "@mui/material"
import { useEffect } from "react"

import { LoadingSpinner } from "../../components"
import { useAppDispatch, useAppSelector, useIsCompact, useStudentId } from "../../lib/hooks"

import MapWithPermission from "./components/MapWithPermission"
import NearbyStudentsList from "./components/NearbyStudentsList"
import StudentMarker from "./components/StudentMarker"
import getLocation from "./redux/actions/getLocation"
import readNearbyStudents from "./redux/actions/readNearbyStudents"

export default function NearbyPage() {
  const dispatch = useAppDispatch()
  const isCompact = useIsCompact()
  const studentId = useStudentId()

  const isAllowed = useAppSelector((state) => state.nearby.isAllowed)
  const location = useAppSelector((state) => state.nearby.locations[studentId])
  const nearbyStudentsIds: number[] = useAppSelector((state) =>
    Object.keys(state.nearby.locations).map((key) => parseInt(key))
  )

  useEffect(() => {
    dispatch(getLocation())
  }, [])

  useEffect(() => {
    if (location !== undefined) dispatch(readNearbyStudents(location))
  }, [location])

  if (isAllowed === undefined || (isAllowed && location === undefined)) return <LoadingSpinner />
  else
    return (
      <Grid container direction={isCompact ? "column" : "row"} spacing={1}>
        <Grid item xs position="relative">
          <MapWithPermission center={location} isAllowed={isAllowed}>
            {nearbyStudentsIds.map((nearbyStudentId) => (
              <StudentMarker
                key={nearbyStudentId}
                studentId={nearbyStudentId}
                isSelf={nearbyStudentId === studentId}
              />
            ))}
          </MapWithPermission>
        </Grid>

        <Grid item xs={4}>
          <Card elevation={3}>
            <NearbyStudentsList
              nearbyStudentsIds={nearbyStudentsIds.filter(
                (nearbyStudentId) => nearbyStudentId !== studentId
              )}
              locationIsAllowed={isAllowed}
            />
          </Card>
        </Grid>
      </Grid>
    )
}
