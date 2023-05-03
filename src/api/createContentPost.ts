import type ContentPost from "../models/ContentPost"
import { getJwt } from "../hooks/useJwt"

// TODO: add more sophisticated error handling
export default async function createContentPost(post: ContentPost): Promise<boolean> {
  try {
    const jwt = getJwt()
    if (jwt == null) return false

    await fetch("api/v1/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })

    return true
  } catch (e) {
    return false
  }
}
