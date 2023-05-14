import { type ReactElement } from "react"
import { Navigate, useParams } from "react-router-dom"
import { Grid } from "@mui/material"

import useIsCompact from "../../hooks/useIsCompact"
import { PrimaryCard, SecondaryCard } from "../../components"

import ProfileDetails from "./components/ProfileDetails"
import { useAppSelector } from "../../redux"

export default function ProfilePage(): ReactElement {
  const isCompact = useIsCompact()
  const currentStudentId = useAppSelector((state) => state.authentication.studentId)

  const { studentId } = useParams()
  if (studentId === undefined || isNaN(parseInt(studentId))) return <Navigate to="/" />

  const id = parseInt(studentId)

  return (
    <Grid container columns={12} spacing={1} direction={isCompact ? "column" : "row-reverse"}>
      <Grid item xs={12} md={4}>
        <PrimaryCard>
          <Grid
            container
            direction="column"
            gap={1}
            justifyContent={isCompact ? "center" : "end"}
            alignItems={isCompact ? "center" : "end"}
          >
            <ProfileDetails
              studentId={id}
              canEdit={currentStudentId !== undefined && id === currentStudentId}
            />
          </Grid>
        </PrimaryCard>
      </Grid>

      <Grid item xs={12} md={8}>
        <SecondaryCard>
          <h1>Posts</h1>
        </SecondaryCard>
      </Grid>
    </Grid>
  )
}
