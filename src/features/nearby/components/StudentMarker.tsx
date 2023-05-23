import { EmojiPeople } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import { OVERLAY_LAYER, OverlayViewF } from "@react-google-maps/api"
import { Fragment, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../lib/hooks"

import ProfileBadge from "../../profiles/components/ProfileBadge"
import { readProfile } from "../../profiles/redux"

export default function StudentMarker({ studentId, isSelf }: Props) {
  const dispatch = useAppDispatch()

  const profile = useAppSelector((state) => state.profiles[studentId])
  const location = useAppSelector((state) =>
    state.nearby.locations !== undefined ? state.nearby.locations[studentId] : undefined
  )

  useEffect(() => {
    if (profile === undefined || location === undefined) dispatch(readProfile(studentId))
  }, [studentId])

  return (
    <Fragment>
      {location !== undefined && (
        <OverlayViewF
          mapPaneName={OVERLAY_LAYER}
          position={{ lat: location.latitude, lng: location.longitude }}
          getPixelPositionOffset={(width, height) => ({
            x: -(width / 2),
            y: -height
          })}
          zIndex={isSelf ?? false ? 10 : 1}
        >
          <Stack
            color={isSelf ?? false ? "darkgreen" : "black"}
            direction="column"
            alignItems="center"
          >
            {profile !== undefined && (
              <Box width={50}>
                <ProfileBadge profile={profile} isSelf={isSelf} />
              </Box>
            )}

            <EmojiPeople sx={{ fontSize: "5vh" }} />
          </Stack>
        </OverlayViewF>
      )}
    </Fragment>
  )
}

interface Props {
  studentId: number
  isSelf?: boolean
}
