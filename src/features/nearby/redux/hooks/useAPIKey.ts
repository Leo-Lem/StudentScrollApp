import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import getAPIKey from "../actions/getAPIKey"

export default function useAPIKey(): string | undefined {
  const apiKey = useAppSelector((state) => state.nearby.apiKey)

  const dispatch = useAppDispatch()
  useEffect(() => void dispatch(getAPIKey()))

  return apiKey
}
