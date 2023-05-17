import { ReactNode } from "react"
import { Box } from "@mui/material"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"

import { LoadingSpinner } from "../../../components"
import Location from "../types/Location"

export default function Map({ center, children }: Props) {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY ?? "" })

  if (isLoaded)
    return (
      <Box height="600px">
        <GoogleMap
          mapContainerClassName="map-container"
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat: center.lat, lng: center.lon }}
          zoom={8}
        >
          {children}
        </GoogleMap>
      </Box>
    )
  else return <LoadingSpinner />
}

interface Props {
  center: Location
  children?: ReactNode
}
