import { useEffect } from "react"

import { Binding, useAppDispatch, useAppSelector, useBinding } from "../../../../lib/hooks"

import ContentPost from "../../types/ContentPost"
import readPosts from "../actions/readPosts"

export default function useDashboardPosts(): DashboardPosts {
  const $newestFirst = useBinding(true)
  const posts = useAppSelector((state) =>
    [...state.posts.posts].sort((a, b) => ($newestFirst.get ? b.id - a.id : a.id - b.id))
  )

  let nextPage: number | undefined = 0

  const dispatch = useAppDispatch()
  async function fetchMore() {
    if (nextPage !== undefined) {
      nextPage = (await dispatch(readPosts({ newestFirst: $newestFirst.get, nextPage })))
        .payload as number | undefined
    }
  }

  useEffect(() => void fetchMore(), [])

  useEffect(() => {
    nextPage = 0
    void fetchMore()
  }, [$newestFirst.get])

  return { posts, $newestFirst, fetchMore }
}

interface DashboardPosts {
  posts: ContentPost[] | undefined
  $newestFirst: Binding<boolean>
  fetchMore: () => Promise<void>
}
