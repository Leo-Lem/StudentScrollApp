import { type ReactElement } from "react"
import { Navigate, useParams } from "react-router-dom"
import { Grid } from "@mui/material"
import { Edit, Save } from "@mui/icons-material"

import useIsCompact from "../../hooks/useIsCompact"
import useBinding from "../../hooks/useBinding"
import { BindingToggle, PrimaryCard, SecondaryCard } from "../../components"

import EditProfileDetails from "./components/EditProfileDetails"
import ProfileDetails from "./components/ProfileDetails"
import { useAppSelector } from "../../redux"
import PrimaryAction from "../../components/buttons/PrimaryAction"

export default function ProfilePage(): ReactElement {
  const isCompact = useIsCompact()
  const currentStudentId = useAppSelector((state) => state.authentication.studentId)

  const { studentId } = useParams()
  if (studentId === undefined || isNaN(parseInt(studentId))) return <Navigate to="/" />

  const id = parseInt(studentId)

  const canEdit = (): boolean => currentStudentId !== undefined && id === currentStudentId

  const $isEditing = useBinding(false)

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
            {canEdit() &&
              <PrimaryAction fixed={isCompact}>
                <BindingToggle $isSelected={$isEditing} sx={{ aspectRatio: 1 }}>
                  {$isEditing.get ? <Save /> : <Edit />}
                </BindingToggle>
              </PrimaryAction>
            }

            {$isEditing.get ? <EditProfileDetails /> : <ProfileDetails studentId={id} />}
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
