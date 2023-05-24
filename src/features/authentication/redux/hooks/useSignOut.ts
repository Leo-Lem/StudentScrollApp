import { useDispatch } from "react-redux"
import { signOut } from "../slice"

export default function useSignOut() {
  const dispatch = useDispatch()

  return () => dispatch(signOut())
}
