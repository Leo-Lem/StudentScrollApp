import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"

import readProfile from "../actions/readProfile"
import Profile from "../../types/Profile"

export default function useProfile(id: number): Profile | undefined {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.profiles.find((p) => p.studentId === id))

  useEffect(() => {
    if (profile === undefined) dispatch(readProfile(id))
  }, [id, profile])

  return profile
}
