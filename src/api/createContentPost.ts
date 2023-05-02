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
): Promise<void> {
  try {
    const post: ContentPost = { posterId, title, tags, content }

    const response = await fetch("api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(post)
    })

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
