import { useAppDispatch } from "../../../../lib/hooks"
import { Tag } from "../../../../res/tags"
import updateProfile from "../actions/updateProfile"

export default function useUpdateProfile(): (
  newName?: string,
  newBio?: string,
  newInterests?: Tag[],
  newIcon?: string
) => Promise<void> {
  const dispatch = useAppDispatch()

  return async (newName?: string, newBio?: string, newInterests?: Tag[], newIcon?: string) => {
    await dispatch(updateProfile({ newName, newBio, newInterests, newIcon }))
  }
}
