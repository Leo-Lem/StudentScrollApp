import { useAppSelector } from "../../../../lib/hooks"

import AuthenticationError from "../../types/AuthenticationError"
import AuthenticationStatus from "../../types/AuthenticationStatus"

export default function useAuthenticationStatus(): {
  status: AuthenticationStatus
  error?: AuthenticationError
} {
  const status = useAppSelector((state) => state.authentication.status)
  const error = useAppSelector((state) => state.authentication.error)

  return { status, error }
}
