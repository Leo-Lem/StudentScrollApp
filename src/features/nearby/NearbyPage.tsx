import { useEffect } from "react"
import { Card, Grid } from "@mui/material"

import { LoadingSpinner } from "../../components"
import { useAppSelector } from "../../redux"
import { useAppDispatch, useStudentId } from "../../redux/hooks"
import useIsCompact from "../../lib/useIsCompact"

import Map from "./components/Map"
import NearbyStudentsList from "./components/NearbyStudentsList"
import StudentMarker from "./components/StudentMarker"
import getLocation from "./redux/actions/getLocation"
import readNearbyStudents from "./redux/actions/readNearbyStudents"

export default function NearbyPage() {
  const dispatch = useAppDispatch()
  const isCompact = useIsCompact()

  const studentId = useStudentId()
  const location = useAppSelector((state) => state.nearby[studentId])
  const nearbyStudentsIds: number[] = useAppSelector((state) =>
    Object.keys(state.nearby).map(Number)
  )

  useEffect(() => {
    dispatch(getLocation())
  }, [])

  useEffect(() => {
    if (location !== undefined) dispatch(readNearbyStudents(location))
  }, [location])

  if (location === undefined) return <LoadingSpinner />
  else
    return (
      <Grid container direction={isCompact ? "column" : "row"} spacing={1}>
        <Grid item xs>
          <Map center={location}>
            {nearbyStudentsIds.map((nearbyStudentId) => (
              <StudentMarker
                key={nearbyStudentId}
                studentId={nearbyStudentId}
                isSelf={nearbyStudentId === studentId}
              />
            ))}
          </Map>
        </Grid>

        <Grid item xs={4}>
          <Card elevation={3}>
            <NearbyStudentsList
              nearbyStudentsIds={nearbyStudentsIds.filter(
                (nearbyStudentId) => nearbyStudentId !== studentId
              )}
            />
          </Card>
        </Grid>
      </Grid>
    )
}
