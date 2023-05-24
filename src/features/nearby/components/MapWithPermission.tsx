import { Chip } from "@mui/material"
import { Fragment, ReactNode } from "react"

import Map from "./Map"

import { useTranslation } from "react-i18next"
import { LoadingSpinner } from "../../../components"
import LocationStatus from "../types/LocationStatus"
import StudentLocation from "../types/StudentLocation"

export default function MapWithPermission({ center, status, children: markers }: Props) {
  const [t] = useTranslation()

  const infoText = (() => {
    switch (status) {
      case "denied":
        return t("LOCATION_DENIED")
      case "unavailable":
        return t("LOCATION_UNAVAILABLE")
      case undefined:
        return <LoadingSpinner />
      default:
        return undefined
    }
  })()

  const infoColor = (() => {
    switch (status) {
      case "denied":
        return "error"
      case "unavailable":
        return "warning"
      default:
        return undefined
    }
  })()

  return (
    <Fragment>
      <Map center={center ?? { latitude: -36.87, longitude: 174.78 }}>
        {status === "permitted" && markers}
      </Map>

      {infoText !== undefined && (
        <Chip
          label={infoText}
          color={infoColor}
          sx={{ position: "absolute", bottom: 10, left: 10 }}
        />
      )}
    </Fragment>
  )
}

interface Props {
  center?: StudentLocation
  status?: LocationStatus
  children: ReactNode
}
