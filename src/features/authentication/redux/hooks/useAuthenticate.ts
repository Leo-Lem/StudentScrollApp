import { useAppDispatch } from "../../../../lib/hooks"

import authenticate from "../actions/authenticate"

export default function useAuthenticate(): (
  name: string | undefined,
  email: string,
  password: string
) => Promise<void> {
  const dispatch = useAppDispatch()

  return async (name: string | undefined, email: string, password: string) => {
    await dispatch(authenticate({ name, email, password }))
  }
}
