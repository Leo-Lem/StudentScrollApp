import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../lib/hooks"

import { Settings } from "../../settings"
import readSettings from "../actions/readSettings"

export default function useSettings(): Settings | undefined {
  const settings = useAppSelector((state) => state.student?.settings)

  const dispatch = useAppDispatch()
  useEffect(() => void dispatch(readSettings()), [])

  return settings
}
