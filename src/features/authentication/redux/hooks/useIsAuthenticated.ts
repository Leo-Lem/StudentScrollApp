import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import loadStudent from "../../../student/actions/loadStudent"

export default function useIsAuthenticated(): boolean {
  const isAuthenticated = useAppSelector((state) => state.authentication.status === "authenticated")

  const dispatch = useAppDispatch()
  useEffect(() => void dispatch(loadStudent()), [isAuthenticated])

  return isAuthenticated
}
