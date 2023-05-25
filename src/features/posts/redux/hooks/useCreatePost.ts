import { useAppDispatch } from "../../../../lib/hooks"
import ContentPost from "../../types/ContentPost"
import createPost from "../actions/createPost"

export default function useCreatePost(): (post: Partial<ContentPost>) => Promise<void> {
  const dispatch = useAppDispatch()

  return async (post: Partial<ContentPost>) => {
    void (await dispatch(createPost(post)))
  }
}
