import { createServer } from "miragejs"

export function mock(): void {
  createServer({
    routes() {
      this.post("api/v1/posts", (_, req) => req.requestBody)
    }
  })
}