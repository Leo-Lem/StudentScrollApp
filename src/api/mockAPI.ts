import { createServer } from "miragejs"

export default function mockAPI(): void {
  createServer({
    routes() {
      this.post("/api/v1/posts", (_, req) => req.requestBody)
    }
  })
}
