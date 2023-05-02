import type ContentPost from "../models/ContentPost"
import { getJwt } from "../hooks/useJwt"

export default async function fetchContentPosts(page: number): Promise<ContentPost[]> {
  const jwt = getJwt()
  if (jwt == null) throw Error("Not authenticated")

  const response = await fetch("api/v1/posts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json"
    }
  })

  return (await response.json()) as ContentPost[]
}
