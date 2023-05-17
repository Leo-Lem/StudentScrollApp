import { EmojiPeople } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import { MARKER_LAYER, OverlayViewF } from "@react-google-maps/api"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { readProfile } from "../../profiles/redux"
import StudentLocation from "../types/Location"
import ProfileBadge from "../../profiles/components/ProfileBadge"

export default function StudentMarker({ studentId, location }: Props) {
  const dispatch = useAppDispatch()

  const profile = useAppSelector((state) => state.profiles[studentId])

  useEffect(() => {
    dispatch(readProfile(studentId))
  }, [studentId])

  return (
    <OverlayViewF
      mapPaneName={MARKER_LAYER}
      position={{ lat: location.lat, lng: location.lng }}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -height
      })}
    >
      <Stack color="darkgreen" direction="column" alignItems="center">
        {profile !== undefined && (
          <Box width={50}>
            <ProfileBadge profile={profile} />
          </Box>
        )}

        <EmojiPeople sx={{ fontSize: "3vw" }} />
      </Stack>
    </OverlayViewF>
  )
}

interface Props {
  studentId: number
  location: StudentLocation
}
