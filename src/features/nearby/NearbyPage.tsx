import { Button, Card, Grid } from "@mui/material"

import { Label } from "../../components"
import { useIsCompact } from "../../lib/hooks"

import { useStudentId } from "../student"
import MapWithPermission from "./components/MapWithPermission"
import NearbyStudentsList from "./components/NearbyStudentsList"
import StudentMarker from "./components/StudentMarker"
import { useLocation, useNearbyStudents } from "./redux"

export default function NearbyPage() {
  const isCompact = useIsCompact()

  const studentId = useStudentId()
  const location = useLocation()
  const nearbyStudents = useNearbyStudents()

  return (
    <Grid container direction={isCompact ? "column" : "row"} spacing={1}>
      <Grid item xs position="relative" sx={{ position: "relative" }}>
        <MapWithPermission center={location?.value} status={location?.status}>
          {nearbyStudents?.map((profile) => (
            <StudentMarker
              key={profile.studentId}
              profile={profile}
              isSelf={profile.studentId === studentId}
            />
          ))}
        </MapWithPermission>

        <Button
          color="inherit"
          variant="contained"
          onClick={() => {
            window.location.reload()
            void location?.refresh()
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
              nearbyStudents
                ?.map((profile) => profile.studentId)
                ?.filter((id) => id !== studentId) ?? []
            }
            locationIsAllowed={location?.status !== "denied"}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
