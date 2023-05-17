import { EmojiPeople } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import { Marker, OVERLAY_LAYER, OverlayViewF } from "@react-google-maps/api"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../redux"
import { readProfile } from "../../profiles/redux"
import ProfileBadge from "../../profiles/components/ProfileBadge"

export default function StudentMarker({ studentId, isSelf }: Props) {
  const dispatch = useAppDispatch()

  const profile = useAppSelector((state) => state.profiles[studentId])
  const location = useAppSelector((state) => state.nearby[studentId])

  useEffect(() => {
    console.log(profile)
    dispatch(readProfile(studentId))
  }, [studentId])

  return (
    <OverlayViewF
      mapPaneName={OVERLAY_LAYER}
      position={{ lat: location.lat, lng: location.lng }}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -height
      })}
    >
      <Stack color="black" direction="column" alignItems="center">
        {profile !== undefined && (
          <Box width={50}>
            <ProfileBadge profile={profile} isSelf={isSelf} />
          </Box>
        )}

        <EmojiPeople sx={{ fontSize: "4vw" }} />
      </Stack>
    </OverlayViewF>
  )
}

interface Props {
  studentId: number
  isSelf?: boolean
}
