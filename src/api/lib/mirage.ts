import { createServer } from "miragejs"
import type ContentPost from "../../models/ContentPost"

export default function mock(): void {
  createServer({
    routes() {
      this.post("api/v1/posts", (_, req) => req.requestBody)

      this.get("api/v1/posts", (_, _1) => {
        return [
          {
            id: 1,
            title: "First post",
            tags: ["First"],
            content: "This is a placeholder post",
            posterId: 1
          },
          {
            id: 2,
            title: "Second post",
            tags: ["Second"],
            content: "This is another placeholder post",
            posterId: 1
          }
        ] as ContentPost[]
      })

      this.post("/api/v1/students", (_, req) => req.requestBody)
      this.post("/api/v1/signin", (_, req) => req.requestBody)
    }
  })
}
