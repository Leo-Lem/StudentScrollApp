import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import LocationStatus from "../../types/LocationStatus"
import StudentLocation from "../../types/StudentLocation"
import getLocation from "../actions/getLocation"

export default function useLocation():
  | { status: LocationStatus; value?: StudentLocation; refresh: () => Promise<void> }
  | undefined {
  const status = useAppSelector((state) => state.nearby.status)
  const location = useAppSelector((state) => state.nearby.location)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (status === undefined) dispatch(getLocation())
  })

  if (status === undefined) return undefined
  else
    return {
      status,
      value: location,
      refresh: async () => void (await dispatch(getLocation()))
    }
}
