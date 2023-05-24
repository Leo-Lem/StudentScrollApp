import { EmojiPeople } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import { OVERLAY_LAYER, OverlayViewF } from "@react-google-maps/api"
import { Fragment } from "react"

import { Profile } from "../../profiles"
import ProfileBadge from "../../profiles/components/ProfileBadge"

export default function StudentMarker({ profile, isSelf }: Props) {
  if (profile.location === undefined) return <></>
  else
    return (
      <Fragment>
        {location !== undefined && (
          <OverlayViewF
            mapPaneName={OVERLAY_LAYER}
            position={{ lat: profile.location.latitude, lng: profile.location.longitude }}
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
  profile: Profile
  isSelf?: boolean
}
