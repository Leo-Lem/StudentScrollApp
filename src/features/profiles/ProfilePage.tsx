import { type ReactElement } from "react"
import { Card, Grid } from "@mui/material"
import { Navigate, useParams } from "react-router-dom"

import useIsCompact from "../../hooks/useIsCompact"

import ProfileView from "./components/ProfileView"

export default function ProfilePage(): ReactElement {
  const { studentId } = useParams()
  if (studentId === undefined || isNaN(parseInt(studentId))) return <Navigate to="/" />

  const isCompact = useIsCompact()

  const id = parseInt(studentId)

  return (
    <Grid container columns={12} spacing={1} direction={isCompact ? "column" : "row-reverse"}>
      <Grid item xs={12} md={4}>
        <Card elevation={2}>
          <ProfileView studentId={id} />
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <h1>Posts</h1>
        </Card>
      </Grid>
    </Grid>
  )
}
