import { type Request, createServer, Model, IdentityManager, Response } from "miragejs"

import { type ContentPost } from "../models"

export default function mockAPI(): void {
  createServer({
    environment: "development",
    identityManagers: {
      application: IdentityManager,
    },
    models: {
      student: Model,
      post: Model
    },
    seeds(server) {
      server.create("post", {
        id: "1",
        title: "First post",
        tags: ["First"],
        content: "This is a placeholder post",
        posterId: 1
      })
      server.create("post", {
        id: "2",
        title: "Second post",
        tags: ["Second"],
        content: "This is another placeholder post",
        posterId: 1
      })
    },
    routes() {
      this.post("api/v1/posts", mockCreatingPost)
      this.get("api/v1/posts", mockFetchingPosts)
      this.post("/api/v1/students", mockSignUp)
      this.post("/api/v1/signin", mockSignIn)
    }
  })
}

const mockCreatingPost = (schema: any, request: Request): ContentPost =>
  schema.posts.create(JSON.parse(request.requestBody))

const mockFetchingPosts = (schema: any, request: Request): Response =>
  new Response(200, {}, JSON.stringify(
    (schema.posts.all().models as any[])
      .map(model => ({ ...model.attrs, id: parseInt(model.id) }))
      .sort((lhs: any, rhs: any) => JSON.parse(request.queryParams.sortAscending) as boolean ? lhs.id - rhs.id : rhs.id - lhs.id)

  ))



const mockSignUp = (schema: any, request: Request): any =>
  schema.students.create(JSON.parse(request.requestBody))

const mockSignIn = (schema: any, request: Request): any =>
  schema.students.create(JSON.parse(request.requestBody))
