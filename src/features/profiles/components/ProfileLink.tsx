import { Button, Card, CircularProgress, Link, Typography } from "@mui/material";
import { ReactElement, useEffect } from "react";

import { ProfileIcon } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { readProfile } from "../api";

export default function ProfileLink({ studentId }: Props): ReactElement {
  const profile = useAppSelector((state) => state.profiles[studentId])

  const dispatch = useAppDispatch()

  useEffect(() => { dispatch(readProfile(studentId)) }, [])

  if (profile === undefined)
    return <CircularProgress />
  else
    return (
      <Card elevation={3}>
        <Button
          color="inherit"
          component={Link}
          href={`/profile/${studentId}`
          } sx={{ display: "flex", flexDirection: "column", gap: 1, aspectRatio: 1 }}
        >
          <ProfileIcon iconId={profile.icon} sx={{ width: "100%", height: "100%" }} />
          <Typography maxWidth="100%" noWrap textOverflow="ellipsis" fontSize={10}>{profile.name}</Typography>
        </Button >
      </Card>
    )
}

interface Props {
  studentId: number
}