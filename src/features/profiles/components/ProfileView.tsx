import { ReactElement } from "react";
import { Card, Grid } from "@mui/material";

import useBinding from "../../../hooks/useBinding";
import useIsCompact from "../../../hooks/useIsCompact";
import { useAppSelector } from "../../../redux";

import EditProfileDetails from "./EditProfileDetails";
import ProfileDetails from "./ProfileDetails";
import BindingToggle from "../../../components/buttons/BindingToggle";
import { Edit, Save } from "@mui/icons-material";

export default function ProfileView({ studentId }: Props): ReactElement {
  const currentStudentId = useAppSelector((state) => state.authentication.studentId)
  const canEdit = (): boolean => currentStudentId !== undefined && studentId === currentStudentId

  const $isEditing = useBinding(false)

  const isCompact = useIsCompact()

  return (
    <Grid
      container
      direction="column"
      padding={1}
      gap={1}
      justifyContent={isCompact ? "center" : "end"}
      alignItems={isCompact ? "center" : "end"}
    >
      {canEdit() && (
        <Card
          elevation={20}
          sx={isCompact
            ? { position: "fixed", margin: 1, bottom: 0, right: 0 }
            : { aspectRatio: 1, alignSelf: "end" }}>
          <BindingToggle $isSelected={$isEditing} sx={{ aspectRatio: 1 }}>
            {$isEditing.get ? <Save /> : <Edit />}
          </BindingToggle>
        </Card>
      )
      }

      {$isEditing.get
        ? <EditProfileDetails />
        : <ProfileDetails studentId={studentId} />
      }
    </Grid>
  )
}

interface Props {
  studentId: number
}