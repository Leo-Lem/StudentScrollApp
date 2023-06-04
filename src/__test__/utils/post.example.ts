import { ContentPost } from "../../features/posts"

export default function examplePost(): ContentPost {
  return {
    id: Math.floor(Math.random() * 100),
    title: "Example Post",
    tags: ["example", "post"],
    content: "This is an example post.",
    posterId: Math.floor(Math.random() * 100)
  }
}
