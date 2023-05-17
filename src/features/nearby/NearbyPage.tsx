import { useEffect } from "react"

import { LoadingSpinner } from "../../components"
import { useAppSelector } from "../../redux"
import { useAppDispatch, useStudentId } from "../../redux/hooks"

import Map from "./components/Map"
import getLocation from "./redux/actions/getLocation"
import StudentMarker from "./components/StudentMarker"
import { Card, Grid } from "@mui/material"
import NearbyStudentsList from "./components/NearbyStudentsList"

export default function NearbyPage() {
  const dispatch = useAppDispatch()

  const studentId = useStudentId()
  const location = useAppSelector((state) => state.nearby[studentId])
  const nearbyStudentsIds: number[] = useAppSelector((state) =>
    Object.keys(state.nearby).map(Number)
  )

  useEffect(() => {
    dispatch(getLocation())
  }, [])

  if (location === undefined) return <LoadingSpinner />
  else
    return (
      <Grid container direction="row" spacing={1}>
        <Grid item xs>
          <Map center={location}>
            {nearbyStudentsIds.map((nearbyStudentId) => (
              <StudentMarker
                key={nearbyStudentId}
                studentId={studentId}
                location={location}
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
