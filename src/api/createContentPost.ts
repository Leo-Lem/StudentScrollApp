interface ContentPost {
  posterId: number
  title: string
  tags: string[]
  content: string
}

export default async function createContentPost(
  jwt: string,
  posterId: number,
  title: string,
  tags: string[],
  content: string
): Promise<boolean> {
  try {
    const post: ContentPost = { posterId, title, tags, content }
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
