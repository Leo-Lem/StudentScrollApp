import { Box, Typography } from "@mui/material"
import { Fragment, ReactNode } from "react"
import Map from "./Map"
import StudentLocation from "../types/Location"

export default function MapWithPermission({ center, isAllowed, children: markers }: Props) {
  return (
    <Fragment>
      <Map center={center ?? { lat: -36.87, lng: 174.78 }}>{isAllowed && markers}</Map>

      {!isAllowed && (
        <Box
          position="absolute"
          width="100%"
          height="100%"
          top={0}
          left={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            color="black"
            variant="h3"
            textAlign="center"
            sx={{ rotate: "30deg", transformOrigin: "center", textShadow: "0 0 10px green" }}
          >
            Please enable your location to use this feature…
          </Typography>
        </Box>
      )}
    </Fragment>
  )
}

interface Props {
  center?: StudentLocation
  isAllowed: boolean
  children: ReactNode
}
