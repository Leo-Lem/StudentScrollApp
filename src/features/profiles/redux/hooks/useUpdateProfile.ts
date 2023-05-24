import { useAppDispatch } from "../../../../lib/hooks"
import updateProfile from "../actions/updateProfile"

export default function useUpdateProfile(): (
  newName?: string,
  newBio?: string,
  newIcon?: string
) => Promise<void> {
  const dispatch = useAppDispatch()

  return async (newName?: string, newBio?: string, newIcon?: string) => {
    await dispatch(updateProfile({ newName, newBio, newIcon }))
  }
}
