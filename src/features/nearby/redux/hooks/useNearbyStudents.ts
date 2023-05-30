import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import { Profile } from "../../../profiles"
import readNearbyStudents from "../actions/readNearbyStudents"

export default function useNearbyStudents(): Profile[] | undefined {
  const location = useAppSelector((state) => state.nearby.location)

  const nearbyStudents = useAppSelector((state) =>
    state.profiles.filter(
      (profile) =>
        location?.latitude !== undefined &&
        location?.longitude !== undefined &&
        profile.location?.latitude !== undefined &&
        profile.location?.longitude !== undefined &&
        profile.location.latitude < location.latitude + 0.1 &&
        profile.location.latitude > location.latitude - 0.1 &&
        profile.location.longitude < location.longitude + 0.1 &&
        profile.location.longitude > location.longitude - 0.1
    )
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (location !== undefined) void dispatch(readNearbyStudents(location))
  }, [location])

  return location === undefined ? undefined : nearbyStudents
}
