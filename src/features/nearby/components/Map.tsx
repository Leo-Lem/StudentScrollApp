import { Box } from "@mui/material"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { ReactNode } from "react"

import { LoadingSpinner } from "../../../components"

import { useAPIKey } from "../redux"
import StudentLocation from "../types/StudentLocation"

export default function Map({ center, zoom, children }: Props) {
  const apiKey = useAPIKey()

  if (apiKey !== undefined)
    return (
      <Box height="70vh">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerClassName="map-container"
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: center.latitude, lng: center.longitude }}
            zoom={zoom ?? 14}
          >
            {children}
          </GoogleMap>
        </LoadScript>
      </Box>
    )
  else return <LoadingSpinner />
}

interface Props {
  center: StudentLocation
  zoom?: number
  children?: ReactNode
}
